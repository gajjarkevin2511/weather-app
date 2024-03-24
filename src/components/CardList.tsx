import Image from 'next/image'
import { CELCIUS, DEGREE, weatherIcons } from '@/utilities/constants'
import React from 'react'
import { kelvinToCelsius, kelvinToFahrenheit } from '@/utilities/functions'
import { inject, observer } from 'mobx-react'
import weatherStore from '../stores/WeatherStore'

const CardList: React.FC = () => {
  if (weatherStore.loading || weatherStore.error) return null

  return (
    weatherStore.forecastdata?.length > 0 && (
      <>
        <div className='day-list-container'>
          <ul className='day-list'>
            {weatherStore.forecastdata?.map((day: any) => {
              return (
                <li key={day.id}>
                  <div className='day'>{day.day}</div>
                  <div className='icon'>
                    <Image src={weatherIcons[day.icon]} height={40} width={40} alt={day.icon} />
                  </div>
                  <div className='temp-container'>
                    <span className='temp1'>
                      {weatherStore.temperaturetype === CELCIUS
                        ? kelvinToCelsius(day.maxTemp)
                        : kelvinToFahrenheit(day.maxTemp)}

                      <span>o</span>
                    </span>
                    <span className='temp2'>
                      {weatherStore.temperaturetype === CELCIUS
                        ? kelvinToCelsius(day.minTemp)
                        : kelvinToFahrenheit(day.minTemp)}
                      <span>{DEGREE}</span>
                    </span>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </>
    )
  )
}

export default inject('weatherStore')(observer(CardList))
