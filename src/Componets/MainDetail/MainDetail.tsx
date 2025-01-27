import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import GetData from '../../utils/GetData.tsx';
import Snow from '../img/Snow.png';
import { selectSearchCity, setWeather } from "../../store/weatherSlice.ts";
import './MainDetail.css';
import Loader from '../../page/img/Loader.svg'

export default function MainDetail() {
    const [lat, setLat] = useState<number | null>(null);
    const [lon, setLon] = useState<number | null>(null);
    const [currentTime, setCurrentTime] = useState<string>('');

    const dispatch = useDispatch();
    const selectCity = useSelector(selectSearchCity);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                setLat(latitude);
                setLon(longitude);
            },

            (error) => {
                console.error("Не вдалося отримати координати:", error);
             }
        );
    }, []);
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const day = now.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            setCurrentTime(`${time} - ${day}`);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const { data, isLoading, error } = useQuery({
        queryKey: ["city", "weatherDataCurrent", selectCity],
        queryFn: () => (lat && lon ? GetData(lat, lon, selectCity) : Promise.resolve(null)),
        enabled: lat !== null && lon !== null || selectCity !== "",
    });

    useEffect(() => {
        if (data?.weatherData) {
            dispatch(setWeather(data.weatherData));
        }
    }, [data, dispatch]);

    if (isLoading) return <div className={'Loader'}><img src={Loader} alt=""/></div>;
    if (error) return <div>Помилка: {error.message} </div>;

    return (
        <div className="main-detail">
            <div className="main-detail__temperature">
                <p>{data?.weatherData?.current?.temperature_2m ?? "N/A"}°</p>
            </div>
            <div className="main-detail__location">
                <p className="main-detail__location-name">{data?.city ?? "Місто не знайдено"}</p>
                <p className="main-detail__location-time">{currentTime}</p>
            </div>
            <div className="main-detail__weather">
                <img src={Snow} alt="Snow"/>
            </div>
        </div>
    );
}
