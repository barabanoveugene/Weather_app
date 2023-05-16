import { getDayWeather } from './parser';
import { getDailyWeather } from './parser';

export function parserForSelectedCity (data) {
  return {
    dayWeather: getDayWeather(data.current, data.timezone_offset, data.timezone),
    dailyWeather: getDailyWeather(data.daily, data.timezone_offset)
  }
}