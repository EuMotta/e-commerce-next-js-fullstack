
import Head from 'next/head'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Zé</title>
        <meta name="description" content="e-commerce shop created by Next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className='text text-9xl hover:bg-white hover:text-red-600 text-center container' >E-commerce</h1>
      
    </div>
  )
}
