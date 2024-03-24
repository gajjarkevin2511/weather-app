import React, { ChangeEvent, useState } from 'react'
import { suggestions } from '../../utilities/constants'
import weatherStore from '@/stores/WeatherStore'
import { ISearchComponentProps } from '@/types/types'

const Search: React.FC<ISearchComponentProps> = ({
  showSuggestions,
  location,
  setLocation,
  onSearchClick,
  placeHolder,
}) => {
  const [suggest, setSuggest] = useState<string[]>([])

  const onSuggestionClick = (locationName: string): void => {
    weatherStore.fetchWeatherData(locationName)
    setLocation(locationName)
    setSuggest([])
  }

  const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setLocation(e.target.value)
    getSuggestions(e.target.value)
  }

  const getSuggestions = (name: string): void => {
    if (!name) {
      setSuggest([])
      return
    }

    const suggestionList: string[] | [] = suggestions.filter((e: string) =>
      e.toLocaleLowerCase().includes(name.toLocaleLowerCase()),
    )
    setSuggest(suggestionList)
  }

  return (
    <div className='search-container'>
      <input value={location} placeholder={placeHolder} onChange={onInputChange} />
      {showSuggestions && (
        <div className='suggestion'>
          {suggest.length > 0
            ? suggest.map((locationName: string) => (
                <button key={locationName} onClick={() => onSuggestionClick(locationName)}>
                  {locationName}
                </button>
              ))
            : null}
        </div>
      )}

      <div
        className='overlay'
        onClick={() => {
          onSearchClick()
          setSuggest([])
        }}
      ></div>
    </div>
  )
}

export default Search
