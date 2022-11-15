import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'
import Layout from '../../components/Layout'
import { MdAdminPanelSettings } from 'react-icons/md'

export default function adminProfile() {
    const { status, data: session } = useSession()


    const checkCNPJ = (e) => {
        const cnpjEmpresa = '08965289000861';
        const cnpj = e.target.value.replace(/\D/g, '')
        fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpjEmpresa}`).then(res => res.json()).then(data => {
            console.log(data)
        })
    }

    return (
        <Layout>
            <div className=''>
                <div className='grid grid-cols-6 gap-5'>
                    <div className='border-4 col-span-4 rounded-lg p-10 bg-slate-50 shadow-sm shadow-slate-600'>
                        <span className='text-center my-2'>
                            <h2 className='text-5xl'><span className='text-indigo-600'>Informações </span> da Empresa</h2>
                        </span>
                        <div>
                            <div className='mt-4 flex gap-10 border p-2'>
                                <div className="text-md p-2 text-center shadow  shadow-slate-600 py-2">
                                    <div className='text-indigo-600'>Razão Social:</div> <span className=''>Non-Fungible-Token e-commerce</span>
                                </div>
                                <div className="text-md p-2 text-center shadow  shadow-slate-600 py-2">
                                    <div className='text-indigo-600'>Nome Fantasia:</div> <span className=''>nfTrade</span>
                                </div>
                                <div className="text-md p-2 text-center shadow  shadow-slate-600 py-2">
                                    <div className='text-indigo-600'>Filial:</div> <span className=''>Matriz</span>
                                </div>
                            </div>
                            <div className='mt-4 flex gap-10 border p-2'>
                                <div className="text-md p-2 text-center shadow  shadow-slate-600 py-2">
                                    <div className='' id="number">Situação Cadastral</div> <span className=''>2</span>
                                </div>
                            </div>
                            <button
                                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:shadow-md focus:shadow-slate-500 focus:bg-indigo-300 focus:border-blue-600 focus:outline-none"
                                id="postalCode"
                                onClick={checkCNPJ}
                            />
                        </div>
                    </div>
                    <div className='col-span-2 bg-slate-900 shadow-sm shadow-slate-600'>

                        <div className='border-4 '>
                            {session?.user.isAdmin ?
                                (
                                    <div className='p-10'>
                                        <div className='flex justify-center '>
                                            <Image
                                                src={`/imgUser/${session.user.name}.jpg`}
                                                width={100}
                                                height={100}
                                                unoptimized
                                                className="shadow-black rounded-full "
                                                alt="Foto de perfil"
                                            />
                                        </div>

                                        <div className=''>
                                            <span className='text-xl text-slate-50 flex justify-center'><MdAdminPanelSettings className='text-3xl' />Administrador</span>
                                        </div>
                                        <div className='mt-4 grid gap-y-4 border p-2'>
                                            <div className="text-md text-white text-center shadow  shadow-slate-50 py-2">
                                                <div className=''>Nome:</div> <span className='text-slate-50 '>{session.user.name}</span>
                                            </div>
                                            <div className="text-md text-white text-center shadow  shadow-slate-50 py-2">
                                                <div className=''>Email:</div> <span className='text-slate-50 '>{session.user.email}</span>
                                            </div>
                                            <div className="text-md text-white text-center shadow  shadow-slate-50 py-2">
                                                <div className=''>ID:</div> <span className='text-slate-50 '>{session.user._id}</span>
                                            </div>

                                        </div>
                                    </div>
                                ) : ("")
                            }
                        </div>

                    </div>


                </div>
            </div>

        </Layout>
    )
}
