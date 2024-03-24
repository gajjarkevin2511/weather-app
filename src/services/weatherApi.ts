import { apiKey } from '../utilities/securityKey'

export const getWeatherDataApi = async (weatherType: string, location: string): Promise<any> => {
  const BASE_URL = 'https://api.openweathermap.org/data/2.5'
  try {
    const weatherRes: Response = await fetch(`${BASE_URL}/${weatherType}?q=${location}&appid=${apiKey}`)
    const weather = await weatherRes.json()
    return weather
  } catch (error) {
    return error
  }
}
