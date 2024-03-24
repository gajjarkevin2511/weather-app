import Image from 'next/image'
import sunny from '../assets/cloud.svg'
import {
  CARD_SMALL_ICON_SIZE,
  DEFAULT_CITY,
  DEGREE,
  HUMIDITY_TEXT,
  KM_PER_HOUR,
  MAIN_ICON_SIZE,
  PERCENTAGE,
  WIND_TEXT,
  weatherIcons,
} from '../utilities/constants'
import { useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import weatherStore from '../stores/WeatherStore'
import Search from './commonComponents/Search'
import Error from './commonComponents/Error'
import Loading from './commonComponents/Loading'
import Toggle from './commonComponents/Toggle'

const Card: React.FC = () => {
  useEffect(() => {
    weatherStore.fetchWeatherData(DEFAULT_CITY)
  }, [])

  return (
    <>
      <div className='card-container'>
        <Search placeHolder='Search by City' showSuggestions={true} key='searchComponent' />
        {weatherStore.error ? (
          <Error text='Error: Invalid City/State' key='errorComponent' />
        ) : weatherStore.loading ? (
          <Loading text='Getting Data...' />
        ) : (
          <>
            <div className='icon'>
              <Image
                src={weatherIcons[weatherStore.weatherData.weather] || sunny}
                alt='weather-icon'
                width={MAIN_ICON_SIZE}
                height={MAIN_ICON_SIZE}
              />
            </div>
            <div className='temperature'>
              <p>
                {weatherStore.convertedTemperature} <span>{DEGREE}</span> {weatherStore.temperaturetype}
              </p>
              <Toggle />
            </div>
            <div className='city'>{weatherStore.weatherData?.name}</div>
            <div className='state'>{weatherStore.weatherData.weather}</div>
            <div className='day-time'>
              {weatherStore.weatherData.day}, {weatherStore.weatherData.time}
            </div>
            <div className='wind-humadity'>
              <div className='lastText'>
                <Image
                  src={weatherIcons[weatherStore.weatherData.weather] || sunny}
                  width={CARD_SMALL_ICON_SIZE}
                  height={CARD_SMALL_ICON_SIZE}
                  alt={weatherStore.weatherData.weather}
                />
                <div className='percentage-humadity'>
                  <span className='number'>{`${weatherStore.weatherData.percentage} ${PERCENTAGE}`}</span>
                  <span className='text'>{HUMIDITY_TEXT}</span>
                </div>
              </div>
              <div className='lastText'>
                <Image
                  src={weatherIcons[weatherStore.weatherData.weather] || sunny}
                  width={CARD_SMALL_ICON_SIZE}
                  height={CARD_SMALL_ICON_SIZE}
                  alt={weatherStore.weatherData.weather}
                />

                <div className='percentage-humadity'>
                  <span className='number'>{`${weatherStore.weatherData.speed} ${KM_PER_HOUR}`}</span>
                  <span className='text'>{WIND_TEXT}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default inject('weatherStore')(observer(Card))
