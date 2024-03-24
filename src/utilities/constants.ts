import Clouds from '../assets/cloud.svg'
import snow from '../assets/snow.svg'
import Rain from '../assets/Rain.svg'
import Clear from '../assets/clear.svg'
import Thunderstorm from '../assets/thunderstrome.svg'
import Mist from '../assets/mist.svg'
import Sand from '../assets/sand.svg'

type WeatherIcons = Record<string, string>
export const weatherIcons: WeatherIcons = {
  Clouds,
  Rain,
  Clear,
  snow,
  Drizzle: Rain,
  Thunderstorm,
  Mist,
  Fog: Mist,
  Sand,
  Smoke: Mist,
}

export const suggestions: string[] = [
  'ahmedabad',
  'jaypur',
  'mumbai',
  'delhi',
  'kolkata',
  'chennai',
  'bangalore',
  'hyderabad',
  'pune',
  'surat',
  'lucknow',
  'kanpur',
  'nagpur',
  'patna',
  'indore',
  'thane',
  'bhopal',
  'visakhapatnam',
  'vadodara',
  'firozabad',
  'ludhiana',
]

export const DEFAULT_CITY: string = 'ahmedabad'
export const HUMIDITY_TEXT: string = 'Humidity'
export const WIND_TEXT: string = 'Wind Speed'
export const MAIN_ICON_SIZE: number = 100
export const CARD_SMALL_ICON_SIZE: number = 40
export const CELCIUS: string = 'C'
export const FAHRENHEIT: string = 'F'
export const WEATHER: string = 'weather'
export const FORECAST: string = 'forecast'
export const API_FAIL_MESSAGE: string = 'Failed To Fetch Data'
export const DEGREE: string = 'o'
export const WEATHER_ICON_ALT_TEXT: string = 'weather icon'
export const KM_PER_HOUR: string = 'km/h'
export const PERCENTAGE: string = '%'
