export default async function GetCityAndWeather(lat: number, lon: number, cityChange: string) {
    try {
        if (cityChange && cityChange.trim() !== "") {
            // Отримуємо координати міста
            const geoRes = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(cityChange)}&format=json&limit=1`,
                {
                    headers: {
                        "User-Agent": "MyApp/1.0 (cunsasa878@gmail.com)",
                    },
                }
            );

            if (!geoRes.ok) {
                throw new Error("Не вдалося знайти координати міста");
            }

            const geoData = await geoRes.json();

            if (!geoData.length) {
                throw new Error(`Не вдалося знайти місто: ${cityChange}`);
            }

            lat = parseFloat(geoData[0].lat);
            lon = parseFloat(geoData[0].lon);
        }

        // Отримуємо назву міста за координатами
        const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
            {
                headers: {
                    "User-Agent": "MyApp/1.0 (cunsasa878@gmail.com)",
                },
            }
        );

        if (!res.ok) {
            throw new Error("Не вдалося знайти місто");
        }

        const cityData = await res.json();
        const city =
            cityData.address.city ||
            cityData.address.town ||
            cityData.address.village ||
            "Не вдалося знайти місто";

        // Отримуємо погоду
        const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,cloudcover,wind_speed_10m,relative_humidity_2m&daily=temperature_2m_max,temperature_2m_min,weathercode&forecast_days=5&timezone=auto`
        );

        if (!weatherRes.ok) {
            throw new Error("Не вдалося отримати погоду");
        }

        const weatherData = await weatherRes.json();

        return { city, weatherData };
    } catch (error) {
        console.error(error);
        throw error;
    }
}
