import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface CurrentWeather {
    temperature_2m: number | null;
    cloudcover: number | null;
    wind_speed_10m: number | null;
    relative_humidity_2m: number | null;
    weathercode: number | null;
}

interface WeatherData {
    current: CurrentWeather;
    temperature_2m_max: number[] | null;
    temperature_2m_min: number[] | null;
    current_units: {
        temperature_2m: string;
        cloudcover: string;
        wind_speed_10m: string;
        relative_humidity_2m: string;
    };
    elevation: number | null;
    latitude: number | null;
    longitude: number | null;
    timezone: string;
    daily?: {
        temperature_2m_max: number[];
        temperature_2m_min: number[];
        time: string[];
        weathercode: number[];
    };
    daily_units?: {
        temperature_2m_max: string;
        temperature_2m_min: string;
        time: string;
    };
}

interface WeatherState {
    city: string;
    searchCity: string; // Додано searchCity
    weather: WeatherData | null;
}

const initialState: WeatherState = {
    city: '',
    searchCity: '', // Ініціалізуємо пустим рядком
    weather: null,
};

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        setCity: (state, action: PayloadAction<string>) => {
            state.city = action.payload;
        },
        setSearchCity: (state, action: PayloadAction<string>) => { // Доданий редюсер для searchCity
            state.searchCity = action.payload;
        },
        setWeather: (state, action: PayloadAction<WeatherData>) => {
            state.weather = action.payload;
        },
        updateTemperature: (state, action: PayloadAction<{ temperature_2m_max: number[] | null; temperature_2m_min: number[] | null }>) => {
            if (state.weather) {
                state.weather.temperature_2m_max = action.payload.temperature_2m_max;
                state.weather.temperature_2m_min = action.payload.temperature_2m_min;
            }
        },
        updateDailyWeather: (state, action: PayloadAction<{ daily: { temperature_2m_max: number[]; temperature_2m_min: number[]; time: string[]; weatherCode: number[] } }>) => {
            if (state.weather) {
                state.weather.daily = action.payload.daily;
            }
        },
    },
});

export const { setCity, setSearchCity, setWeather, updateTemperature, updateDailyWeather } = weatherSlice.actions;

export const selectCity = (state: RootState) => state.weather.city;
export const selectSearchCity = (state: RootState) => state.weather.searchCity; // Селектор для searchCity
export const selectWeather = (state: RootState) => state.weather.weather;

export default weatherSlice.reducer;
