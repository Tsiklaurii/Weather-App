import { useContext } from "react"
import { iconUrl } from "../../global/config";
import { Loader } from "../Elements/Loader";
import { Text } from '../../components/Elements/'
import { DataContext } from "../../global/contexts/DataContext";

export const BigCard = () => {
    const { city, day } = useContext(DataContext);

    return (
        <div className="big_card">
            {day ?
                <div className="big_card_container">
                    <div className="big_card_image" style={{ backgroundImage: `url(images/${day.weather.description.toLowerCase().replaceAll(" ", "-")}.jpg)` }}>
                        <img src={`${iconUrl}${day.weather.icon}.png`} alt="icon" />
                    </div>
                    <div className="big_card_content">
                        <Text type="big_card">City: {city}</Text>
                        <Text type="big_card">Wind Deg: {day.windDeg}</Text>
                        <Text type="big_card">Wind Speed: {day.windSpeed}</Text>
                        <Text type="big_card">Humidity: {day.humidity}</Text>
                        <Text type="big_card">Pressure: {day.pressure}</Text>
                    </div>
                    <div className="big_card_content">
                        <Text type="big_card">Description: {day.weather.description}</Text>
                        <Text type="big_card">Feels Like: {day.feelsLike}</Text>
                        <Text type="big_card">Temp: {day.temp}</Text>
                        <Text type="big_card">Temp Max: {day.tempMax}</Text>
                        <Text type="big_card">Temp Min: {day.tempMin}</Text>
                    </div>
                </div>
                :
                <Loader />
            }
        </div>
    )
}