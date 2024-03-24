import React, { ChangeEvent, useState } from 'react'
import { suggestions } from '../../utilities/constants'
import weatherStore from '@/stores/WeatherStore'
import { ISearchComponentProps } from '@/types/types'

const Search: React.FC<ISearchComponentProps> = ({ showSuggestions, placeHolder }) => {
  const [suggest, setSuggest] = useState<string[]>([])
  const [location, setLocation] = useState<string>('')
  const { fetchWeatherData } = weatherStore

  const getWeatherData = (): void => {
    fetchWeatherData(location)
    setSuggest([])
  }

  const onSuggestionClick = (locationName: string): void => {
    fetchWeatherData(locationName)
    setLocation(locationName)
    setSuggest([])
  }

  const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const name = e.target.value
    setLocation(name)
    getSuggestions(name)
  }

  const getSuggestions = (name: string): void => {
    if (!name) {
      setSuggest([])
      return
    }

    const suggestionList: string[] = suggestions.filter((e: string) =>
      e.toLocaleLowerCase().includes(name.toLocaleLowerCase()),
    )
    setSuggest(suggestionList)
  }

  return (
    <div className='search-container'>
      <input value={location} placeholder={placeHolder} onChange={onInputChange} />
      {showSuggestions && suggest.length > 0 && (
        <div className='suggestion'>
          {suggest.map((locationName: string) => (
            <button key={locationName} onClick={() => onSuggestionClick(locationName)}>
              {locationName}
            </button>
          ))}
        </div>
      )}

      <div className='overlay' onClick={getWeatherData}></div>
    </div>
  )
}

export default Search
