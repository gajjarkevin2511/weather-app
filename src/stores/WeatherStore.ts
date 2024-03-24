import { makeObservable, observable, action } from 'mobx'
import moment from 'moment'
import { getWeatherDataApi } from '../services/weatherApi'
import { generateCurrentDate, generateCurrentTime, kelvinToCelsius, kelvinToFahrenheit } from '@/utilities/functions'
import { API_FAIL_MESSAGE, CELCIUS, FAHRENHEIT, FORECAST, WEATHER } from '@/utilities/constants'
import { ForecastType, WeatherType } from '@/types/types'

class WeatherStore {
  firstApi: boolean = true

  weatherData: WeatherType = {
    name: '',
    temp: 0,
    humidity: 0,
    weather: '',
    speed: 0,
    day: '',
    time: '',
    percentage: 0,
  }

  convertedTemperature: number = 0
  temperaturetype: string = 'C'
  forecastdata: ForecastType[] = []
  error: boolean = false
  loading: boolean = false

  constructor() {
    makeObservable(this, {
      firstApi: observable,
      weatherData: observable,
      forecastdata: observable,
      temperaturetype: observable,
      convertedTemperature: observable,
      error: observable,
      loading: observable,
      fetchWeatherData: action,
    })
  }

  async fetchWeatherData(location: string) {
    try {
      this.loading = true

      const weather = await getWeatherDataApi(WEATHER, location)
      const forecast = await getWeatherDataApi(FORECAST, location)

      if (!weather || weather.cod !== 200) {
        throw new Error(weather?.message || API_FAIL_MESSAGE)
      }

      const timestamp: number = weather.dt * 1000
      const currentDate: Date = new Date(timestamp)

      const currentDay: string = generateCurrentDate(currentDate)
      const currentTime: string = generateCurrentTime(currentDate)

      this.weatherData = {
        name: weather.name,
        temp: weather.main.temp,
        humidity: weather.main.humidity,
        weather: weather.weather[0]?.main,
        speed: weather.wind.speed,
        day: currentDay,
        time: currentTime,
        percentage: weather.main.humidity,
      }

      const uniqueDays: Set<string> = new Set()

      const forecastList = forecast?.list?.reduce(
        (acc: ForecastType[], e: { dt_txt: number; dt: number; main: any; weather: any[] }) => {
          const dateString: number = e.dt_txt
          const dayName: string = moment(dateString).format('dddd')

          if (!uniqueDays.has(dayName)) {
            uniqueDays.add(dayName)
            acc.push({
              id: e.dt,
              day: dayName,
              minTemp: e.main.temp_min,
              maxTemp: e.main.temp_max,
              icon: e.weather[0]?.main,
            })
          }

          return acc
        },
        [],
      )

      this.forecastdata = forecastList
      this.setTemperaturetype(CELCIUS)

      this.error = false
    } catch (error) {
      this.weatherData = {
        name: '',
        temp: 0,
        humidity: 0,
        weather: '',
        speed: 0,
        day: '',
        time: '',
        percentage: 0,
      }
      this.error = true
    } finally {
      this.loading = false
    }
  }

  setTemperaturetype(temptype: string) {
    if (temptype === CELCIUS) {
      this.convertedTemperature = kelvinToCelsius(weatherStore.weatherData.temp)
      this.temperaturetype = this.firstApi ? CELCIUS : FAHRENHEIT
    } else {
      this.convertedTemperature = kelvinToFahrenheit(weatherStore.weatherData.temp)
      this.temperaturetype = this.firstApi ? FAHRENHEIT : CELCIUS
    }

    this.firstApi = true
  }
}
const weatherStore = new WeatherStore()
export default weatherStore
