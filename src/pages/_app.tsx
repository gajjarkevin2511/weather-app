import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import { Provider } from 'mobx-react'
import weatherStore from '../stores/WeatherStore'
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider weatherStore={weatherStore}>
      <Component {...pageProps} />
    </Provider>
  )
}
