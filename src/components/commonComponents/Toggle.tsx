import weatherStore from '@/stores/WeatherStore'
import { CELCIUS, DEGREE, FAHRENHEIT } from '@/utilities/constants'
import { inject } from 'mobx-react'
import { observer } from 'mobx-react-lite'
import React from 'react'

const Toggle: React.FC = () => {
  return (
    <div className='container'>
      <div className='switches-container'>
        <input
          type='radio'
          id='switchMonthly'
          name='switchPlan'
          value='Monthly'
          onClick={() => weatherStore.setTemperaturetype(FAHRENHEIT)}
        />
        <input
          type='radio'
          id='switchYearly'
          name='switchPlan'
          value='Yearly'
          onClick={() => weatherStore.setTemperaturetype(CELCIUS)}
        />
        <label htmlFor='switchMonthly'>
          <span>{DEGREE}</span>
          {CELCIUS}
        </label>
        <label htmlFor='switchYearly'>
          <span>{DEGREE}</span>
          {FAHRENHEIT}
        </label>
        <div className='switch-wrapper'>
          <div className='switch'></div>
        </div>
      </div>
      <style jsx>
        {`
          .switches-container input:nth-of-type(1):checked ~ .switch-wrapper {
            transform: translateX(0%);
          }

          .switches-container input:nth-of-type(2):checked ~ .switch-wrapper {
            transform: translateX(100%);
          }

          .switches-container input:nth-of-type(1):checked ~ .switch-wrapper .switch div:nth-of-type(1) {
            opacity: 1;
          }

          .switches-container input:nth-of-type(2):checked ~ .switch-wrapper .switch div:nth-of-type(2) {
            opacity: 1;
          }
        `}
      </style>
    </div>
  )
}

export default inject('weatherStore')(observer(Toggle))
