import getCurrentTime from "./getCurrentTime";
import capitalizeFirstLetter from './capitalizeFirstLetter';
import conversionTempFromFtoC from './conversionTempFromFtoC';
import parserCityFromData from './parserCityFromData';

export function getDayWeather(dayWeather, timezoneOffset, timeZone) {
  return {
    value: 'Day',
    city: parserCityFromData(timeZone),
    currentTime: new Date(getCurrentTime(dayWeather.dt,timezoneOffset)).toLocaleTimeString(
        "en-us",
        {
          timeStyle: "short",
        }
      ),
    currentDay: new Date(getCurrentTime(dayWeather.dt,timezoneOffset)).toLocaleDateString(
        "en-us",
        {
          weekday: "short",
          day: "2-digit",
          month: "long",
        }
      ),
    currentDeg: conversionTempFromFtoC(dayWeather.temp).toFixed(0),
    currentFeelLikes: conversionTempFromFtoC(dayWeather.feels_like).toFixed(0),
    description: capitalizeFirstLetter(dayWeather.weather[0].description),
    icon: dayWeather.weather[0].icon,
    windSpeed: dayWeather.wind_speed,
    humidity: dayWeather.humidity
  }
}

export function getDailyWeather(dailyWeather, timezoneOffset) {
  let data = []
  
  for (let index = 0; index < 5; index++) {
    const day = dailyWeather[index];
    const result = {
      value: '5 Days',
      currentTime: new Date(getCurrentTime(day.dt,timezoneOffset)).toLocaleTimeString(
        "en-us",
        {
          timeStyle: "short",
        }
      ),
      currentDay: new Date(getCurrentTime(day.dt,timezoneOffset)).toLocaleDateString(
        "en-us",
        {
          weekday: "short",
          day: "2-digit",
          month: "long",
        }
      ),
      temp_min: conversionTempFromFtoC(day.temp.min).toFixed(0),
      temp_max: conversionTempFromFtoC(day.temp.max).toFixed(0),
      description: capitalizeFirstLetter(day.weather[0].description),
      icon: day.weather[0].icon,
      windSpeed: day.wind_speed,
      humidity: day.humidity
    }
    data.push(result)
  }
  return data
}

 export function getWeatherFromChart (hourlyWeather, dtToDay, timezoneOffset ) {
  return hourlyWeather.map((hour) => {
    return {
      value: 'Chart',
      temp: conversionTempFromFtoC(hour.temp).toFixed(1),
      dt: new Date(getCurrentTime(hour.dt, timezoneOffset)).toLocaleTimeString(
        "uk",
        {
          timeStyle: "short",
        }
      ),
      time: new Date(getCurrentTime(hour.dt, timezoneOffset)).toLocaleDateString(
        "en-us",
        {
          weekday: "short",
          day: "2-digit",
          month: "long",
        }
      )

    }
    }).filter((item) => {
      return item.time === new Date(getCurrentTime(dtToDay, timezoneOffset)).toLocaleDateString(
          "en-us",
          {
            weekday: "short",
            day: "2-digit",
            month: "long",
          }
        )
    })
}