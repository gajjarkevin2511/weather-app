import { Dispatch, SetStateAction } from 'react'

export interface ISearchComponentProps {
  showSuggestions: boolean
  placeHolder: string
}

export interface ForecastType {
  id: number
  day: string
  minTemp: number
  maxTemp: number
  icon: string
}

export interface WeatherType {
  name: string
  temp: number
  humidity: number
  weather: string
  speed: number
  day: string
  time: string
  percentage: number
}

export interface IErrorComponentProps {
  text: string
}

export interface ILoadingComponentProps {
  text: string
}
