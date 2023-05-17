import { getDayWeather } from '../parser'
import { getDailyWeather } from '../parser'

export function parserForSelectedCity(data, cities) {
  const searchCurrentCity = cities.find((item) => data.lon === item.lon)

  return {
    city: searchCurrentCity,
    dayWeather: getDayWeather(data.current, data.timezone_offset, data.timezone),
    dailyWeather: getDailyWeather(data.daily, data.timezone_offset)
  }
}
