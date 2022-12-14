import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../components/Layout'

export default function UnauthorizedProfile() {
    const router = useRouter()
    const {message} = router.query
  return (
    <Layout title={'Acesso Negado'}>
       <div className="card w-full p-5 bg-white">
        <h1 className="text-center text-red-600 text-3xl">
          Acesso não autorizado!
        </h1>
        <div className="mb-4 text-2xl text-center text-gray-900">
            Usuário Administrador não pode alterar o perfil.
          </div>
        {message && (
          <div className="mb-4 text-2xl text-center text-gray-900">
            Você não pode acessar essa página!
          </div>
        )}
        <div className="text-center">
          <button
            onClick={() => router.push("/")}
            type="button"
            className=" bg-blue-800 text-xl text-white"
          >
            Voltar
          </button>
        </div>
      </div>
    </Layout>
  )
}
