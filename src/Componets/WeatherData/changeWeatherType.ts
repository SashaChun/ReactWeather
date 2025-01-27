import sun from './weatherIcons/sune.png'
import cloud from './weatherIcons/Cloudy.png'
import tyman from './weatherIcons/tyman.png'
import rain from './weatherIcons/rain.png'
import snow from './weatherIcons/snow.png'
import mraka from './weatherIcons/outline.png'
import HeavyRain from './weatherIcons/Heavy-rain.png'
import tunder from './weatherIcons/tunder.png'
import {WeatherInfo} from "./WeatherData.tsx";

export function changeWeatherType(code: number): WeatherInfo | string {
    if (code === 0) {
        return {
            title: 'Ясно',
            pick: sun
        }
    }
    if (code >= 1 && code <= 3) {
        return {
            title: 'Хмарно',
            pick: cloud
        }
    }
    if (code === 45 || code === 48) {
        return {
            title: 'Туман',
            pick: tyman
        }
    }
    if (code === 51 || code === 53 || code === 55) {
        return {
            title: 'Мряка',
            pick: mraka
        }
    }
    if (code === 56 || code === 57) {
        return {
            title: 'Сніг',
            pick: snow
        }
    }
    if (code === 61 || code === 63 || code === 65) {
        return {
            title: 'Дощ',
            pick: rain
        }
    }
    if (code === 66 || code === 67) {
        return {
            title: 'Злива',
            pick: HeavyRain
        }
    }
    if (code === 71 || code === 73 || code === 75) {
        return {
            title: 'Сніг',
            pick: snow
        };
    }
    if (code === 77) {
        return {
            title: 'Сніг',
            pick: snow
        }
    }
    if (code === 85 || code === 86) {
        return {
            title: 'Сніг',
            pick: snow
        }
    }
    if (code === 95) {
        return {
            title: 'Гроза',
            pick: tunder
        }
    }
    return "Невідомий тип погоди 🤷";
}
