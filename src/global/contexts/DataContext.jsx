import { createContext, useCallback, useEffect, useState } from "react"
import { defCity } from "../config";
import { getData, setData } from "../storage";
import { getCurrentWeather } from "../../global/api";

export const DataContext = createContext(null)

export const DataProvider = ({ children }) => {
    const [city, setCity] = useState(defCity);
    const [day, setDay] = useState();
    const [mode, setMode] = useState(getData('mode') !== null ? getData('mode') : true);

    const changeCity = useCallback((city) => {
        let newCity = city.split(" - ");
        if (newCity.length > 1) {
            return setCity(newCity[0]);
        }
        setCity(defCity);
    }, []);

    const changeMode = useCallback(() => {
        setMode(!mode);
        setData('mode', !mode);
    }, [mode])

    const updateDay = useCallback((data) => {
        let finalData = {
            weather: data.weather[0],
            windDeg: data?.wind?.deg ?? data.deg,
            windSpeed: data?.wind?.speed ?? data.speed,
            humidity: data?.main?.humidity ?? data.humidity,
            pressure: data?.main?.pressure ?? data.pressure,
            feelsLike: data?.main?.feels_like ?? data.feels_like.day,
            temp: data?.main?.temp ?? data.temp.day,
            tempMax: data?.main?.temp_max ?? data.temp.max,
            tempMin: data?.main?.temp_min ?? data.temp.min,
        }
        setDay(finalData);
    }, []);

    useEffect(() => {
        if (mode) {
            document.body.classList.remove("dark_mode");
        } else {
            document.body.classList.add('dark_mode')
        }
    }, [mode]);

    useEffect(() => {
        const fetchData = async () => {
            const apiData = await getCurrentWeather(`q=${city}`);
            if (apiData) {
                updateDay(apiData.data);
            };
        }
        fetchData();
    }, [city, updateDay])

    return (
        <DataContext.Provider value={{ city, changeCity, mode, changeMode, day, updateDay }}>
            {children}
        </DataContext.Provider>
    )
}
