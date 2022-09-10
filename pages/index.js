
import Head from 'next/head'
import Layout from '../components/Layout'

export default function Home({title}) {
  return (
    <div>
      <Head>
        <title>{title ? title + ' e-commerce' : ' e-commerce'}</title>
        <meta name="description" content="e-commerce shop created by Next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout />
    </div>
  )
}
