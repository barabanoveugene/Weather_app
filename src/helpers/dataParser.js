import parserCityFromData from './parserCityFromData';
import { getDayWeather } from './parser';
import { getWeatherFromChart } from './parser';
import { getDailyWeather } from './parser';



export function dataParser (data) {
  return{
    id: parserCityFromData(data.timezone),
    city: parserCityFromData(data.timezone),
    card: getDayWeather(data.current, data.timezone_offset, data.timezone),
    chart: getWeatherFromChart(data.hourly, data.current.dt, data.timezone_offset),
    daily: getDailyWeather(data.daily, data.timezone_offset)
  }
}