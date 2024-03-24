export const generateCurrentDate = (currentDate: Date): string => {
  return currentDate.toLocaleString('en-us', { weekday: 'long' })
}

export const generateCurrentTime = (currentDate: Date): string => {
  return currentDate.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

export const kelvinToCelsius = (kelvin: number): number => {
  return Math.floor(kelvin - 273.15)
}

export const kelvinToFahrenheit = (kelvin: number): number => {
  return Math.floor(((kelvin - 273.15) * 9) / 5 + 32)
}
