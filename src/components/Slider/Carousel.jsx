import { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import { getWeatherForecast } from "../../global/api";
import { Loader } from "../Elements/Loader";
import { SmallCard } from '../Cards/SmallCard';
import { DataContext } from "../../global/contexts/DataContext";

export const Carousel = () => {
    const { city, updateDay } = useContext(DataContext);
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const apiData = await getWeatherForecast(`q=${city}`);
            if (apiData) {
                setData(apiData.data);
            };
        }
        fetchData();
    }, [city])

    return (
        <div className="carousel">
            {data ?
                <Swiper
                    spaceBetween={50}
                    slidesPerView={7}
                >
                    {data.list.map((item, index) => (
                        <SwiperSlide key={index}>
                            <SmallCard data={item} onClick={() => updateDay(item)} />
                        </SwiperSlide>
                    ))}
                </Swiper>
                :
                <Loader />
            }
        </div>
    )
}