import { getDayWeather } from '../parser'
import { getWeatherFromChart } from '../parser'
import { getDailyWeather } from '../parser'
import { parserCityObject } from './parserCityObject'

export function dataParserWeatherCities(data, infoCity) {
  return {
    id: infoCity.city,
    city: parserCityObject(infoCity),
    card: getDayWeather(data.current, data.timezone_offset, infoCity.city),
    chart: getWeatherFromChart(data.hourly, data.current.dt, data.timezone_offset),
    daily: getDailyWeather(data.daily, data.timezone_offset)
  }
}
