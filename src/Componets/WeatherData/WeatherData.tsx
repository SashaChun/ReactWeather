import './WeatherData.css'
import './WeatherDataMedia.css'

import searchIcon from '../img/seatch.png'
import Cloudly from '../img/Cloudy.png'
import Humadity from '../img/Humadity.png'
import TempMax from '../img/TempMax.png'
import TempMin from '../img/TempMin.png'
import Wind from '../img/Wind.png'
import {selectWeather} from "../../store/weatherSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {changeWeatherType} from "./changeWeatherType.ts";
import {useRef } from "react";
import {setSearchCity} from "../../store/weatherSlice.ts";

export  interface WeatherInfo {
    title: string;
    pick: string;
}

export default function WeatherData(){

    const weatherData = useSelector(selectWeather);
    const dispatch = useDispatch();


     const cityRef = useRef<HTMLInputElement>(null);

    function createWeatherQuery() {
        if (cityRef.current) {
            dispatch(setSearchCity(cityRef.current.value))
        }
    }

    return <div className={'WeatherData'}>
        <div className="WeatherData__inputLine">
            <input ref={cityRef} type="text" className="WeatherData__input" placeholder="Search Location..."/>
            <img src={searchIcon} alt="search icon" onClick={createWeatherQuery}  className="WeatherData__searchIcon"/>
        </div>
        <div className="WeatherData__details">
            <p className={'WeatherData__details-about'}>Weather Details...</p>
            <p className={'WeatherData__details-forecast'}>thunderstorm with light drizzle</p>
            <div className={'WeatherData__detail'}>
                <div className={'WeatherData__detail-Item'}>
                    <p >Temp max</p>
                    <div>
                        <p>{weatherData?.daily?.temperature_2m_max?.[0]}
                            {weatherData?.daily_units?.temperature_2m_max?.[0]}
                        </p>
                        <img src={TempMax} alt="Temp max"/>
                    </div>
                </div>
                <div className={'WeatherData__detail-Item'}>
                    <p>Temp min</p>
                    <div>
                        <p>{weatherData?.daily?.temperature_2m_min?.[0]}
                            {weatherData?.daily_units?.temperature_2m_min?.[0]}
                        </p>
                        <img src={TempMin} alt="Temp min"/>
                    </div>
                </div>
                <div className={'WeatherData__detail-Item'}>
                    <p>Humadity</p>
                    <div>
                        <p>
                            {weatherData?.current.relative_humidity_2m}
                            {weatherData?.current_units.relative_humidity_2m}
                        </p>
                        <img src={Humadity} alt="Humadity"/>
                    </div>
                </div>
                <div className={'WeatherData__detail-Item'}>
                    <p>Cloudy</p>
                    <div>
                        <p>
                            {weatherData?.current.cloudcover}
                            {weatherData?.current_units.cloudcover}
                        </p>
                        <img src={Cloudly} alt="Cloudly"/>
                    </div>
                </div>
                <div className={'WeatherData__detail-Item'}>
                    <p>Wind</p>
                    <div>
                        <p>  {weatherData?.current.wind_speed_10m}
                            {weatherData?.current_units.wind_speed_10m}
                        </p>
                        <img src={Wind} alt="Wind"/>
                    </div>
                </div>
                <div className={'line'}></div>
                <p className={'WeatherData__details-ToDayForecast'}>Today’s Weather Forecast...</p>
                {weatherData?.daily?.time?.map((time, index) => {
                    const weather = weatherData?.daily?.weathercode ? changeWeatherType(weatherData.daily.weathercode[index]) : 'Невідомо';
           const weatherInfo = typeof weather !== 'string' ? weather : null;

                    return (
                        <div className={'WeatherData__details-ToDayForecast-Item'} key={index}>
                            <img
                                className={'ToDayForecast-iMG'}
                                src={weatherInfo ? weatherInfo.pick : ''}
                                alt="Weather Icon"
                            />
                            <div className={'ToDayForecast-Item-time'}>
                                <p>{time}</p>
                                <p>{weatherInfo ? weatherInfo.title : 'Невідомо'}</p>
                            </div>
                            <div>
                                <p>{weatherData?.daily?.temperature_2m_max ? weatherData.daily.temperature_2m_max[index] : 'N/A'}°C</p>
                            </div>
                        </div>
                    );
                })}

                <div className={'line'}></div>
            </div>
        </div>

    </div>
}