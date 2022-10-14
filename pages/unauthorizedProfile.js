import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../components/Layout'

export default function UnauthorizedProfile() {
    const router = useRouter()
    const {message} = router.query
  return (
    <Layout title={'Acesso Negado'}>
        <h1 className='text-center text-2xl'>Acesso Negado</h1>
       <button type='button' onClick={() => router.push('/')}>Voltar</button>
        {message && <div className='mb-4 text-center text-red-500'>{message}</div>}
    </Layout>
  )
}
