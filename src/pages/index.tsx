import Head from 'next/head'
import Card from '../components/Card'
import CardList from '../components/CardList'

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Weather App</title>
      </Head>
      <div className='main-container'>
        <Card />
        <CardList />
      </div>
    </>
  )
}
