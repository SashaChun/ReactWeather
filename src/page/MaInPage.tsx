import './MainPage.css'
import WeatherData from "../Componets/WeatherData/WeatherData.tsx";
import MainDetail from "../Componets/MainDetail/MainDetail.tsx";

export default function MaInPage(){
    return <div className={'backGround'}>
        <MainDetail/>
        <WeatherData/>
    </div>
}