import Image from 'next/image'
import React from 'react'
import Layout from '../components/Layout'
import aboutimg from '../public/img/aboutimg.svg'
import aboutme from '../public/img/aboutme.jpg'
import admin1 from '../public/img/admin1.png'
import { CiBoxList } from 'react-icons/ci'
import { GoGraph } from 'react-icons/go'
import { MdSell } from 'react-icons/md'
import { AiFillEdit } from 'react-icons/ai'


export default function AboutScreen() {
    return (
        <Layout>
            <section className="grid grid-cols-1 mb-5 md:grid-cols-1 bg_img lg:grid-cols-2 sm:grid-cols-1 gap-4">
                <div className="col-span-1 !py-0 text-center">
                    <Image
                        src={aboutimg}
                        className="w-full login_img "
                        alt="Sample image"
                        layout="responsive"
                        width={350}
                        height={350}
                    />
                </div>
                <div className="col-span-1 mt-32  flex flex-col justify-between">
                    <div className="my-10">
                        <div className='ml-10 mb-5 '><span className='text-2xl border rounded-md cursor-default select-none p-2 bg-white '>Sobre mim</span></div>
                        <h1 className="text-5xl lg:ml-10 lg:text-left md:text-center sm:text-center text-center  text-slate-600">
                            Programador e desenvolvedor web,
                            <span className="text-indigo-600"> fullstack!</span>
                        </h1>
                        <p className="text-2xl lg:ml-10 lg:text-left md:text-center sm:text-center text-center text-slate-600 mt-5 lg:w-4/5">
                            Aluno da Faculdade de Tecnologia de Guaratinguetá!
                        </p>
                    </div>
                </div>
            </section>
            <div className='border rounded-lg bg-slate-50 shadow-sm shadow-slate-600 grid  grid-cols-6'>
                <div className='col-span-3 shadow-lg shadow-black m-10'>
                    <Image
                        src={aboutme}
                        className="w-full "
                        alt="Sample image"
                        layout="responsive"
                        width={350}
                        height={350}
                    />
                </div>
                <div className='col-span-3 '>
                    <div className='mt-10 mr-28'>
                        <h2 className='text-4xl abouth2'>Olá, eu sou</h2>
                        <h1 className='py-4 about text-indigo-600 text-5xl'>José Antonio Motta</h1>
                        <h4 className='my-3 about text-3xl'>Estudante em <span className='text-indigo-400'>programação</span></h4>
                        <p>Estou no caminho para me tornar um fullstack e desenvolver os melhores projetos para a sua empresa!</p>
                        <button className='!px-10 !mt-5 !py-2'>GitHub</button>
                        <div className='mx-5 mt-10'>
                            <div className='flex text-xl'>
                                <i className="ri-phone-line text-indigo-600"></i>
                                <p>Phone: +55 12920008749</p>
                            </div>

                            <div className='flex my-2 text-xl'>
                                <i className="ri-mail-send-line text-indigo-600"></i>
                                <p>EMail: <span className='text-indigo-600'>hyperxmotta@hotmail.com</span></p>
                            </div>
                            <div className='flex text-xl'>
                                <i className="ri-map-pin-line text-indigo-600"></i>
                                <p>Address: Brazil - Guaratinguetá, São Paulo </p>
                            </div>

                        </div>
                        <div className='mt-10 text-center'>
                            <button className='text-xl !px-10 primary-button'>Download CV</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='my-36'>
                <div className='text-center mx-32'>
                    <h1 className='text-5xl my-10'>Por que optar pelo nfTrade?</h1>
                    <p className='text-3xl text-indigo-600'>Following reasons show advantages of adding AppCo to your lead pages, demos and checkouts evisculate interoperable imperatives rather.</p>
                </div>
                <div className='grid md:grid-cols-3 mt-20'>
                    <div className="rounded overflow-hidden text-center col-span-1 shadow-lg mx-10">
                        <i className="ri-speed-line text-5xl"></i>
                        <div className="px-6 py-4">
                            <div className="text-2xl mb-2">
                                <h1>16x mais rápido</h1>
                            </div>
                            <p className="text-gray-700 text-base">
                                Website construido em react.js, linguagem que chega a ser <span className='text-indigo-600'>16x</span> mais rápida que um website em HTML.
                            </p>
                        </div>
                        <div className="px-6 pt-4 pb-2">
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Rápido</span>
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Sem atrasos</span>
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Next.js</span>
                        </div>
                    </div>
                    <div className="rounded overflow-hidden text-center col-span-1 shadow-lg mx-10">
                        <i className="ri-filter-off-line text-5xl"></i>
                        <div className="px-6 py-4">
                            <div className="text-2xl mb-2">
                                <h1>Design limpo</h1>
                            </div>
                            <p className="text-gray-700 text-base">
                                O objetivo é facilitar o máximo o manuseio do website por qualquer operador.
                            </p>
                        </div>
                        <div className="px-6 pt-4 pb-2">
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Limpo</span>
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Agradável</span>
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Funcional</span>
                        </div>
                    </div>
                    <div className="rounded overflow-hidden text-center col-span-1 shadow-lg mx-10">
                        <i className="ri-list-settings-line text-5xl"></i>
                        <div className="px-6 py-4">
                            <div className="text-xl mb-2">
                                <h1>Monitoramento Administrativo</h1>
                            </div>
                            <p className="text-gray-700 text-base">
                                Funcionários e Administradores podem monitorar vendas, cadastros e lucros por vendas e um gráfico geral.
                            </p>
                        </div>
                        <div className="px-6 pt-4 pb-2">
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-5 '>
                <div className='col-span-3'>
                    <h1 className='text-5xl mt-20'>Responsividade para todos os dispositivos!</h1>
                    <div className='mt-24'>
                        <div className='flex my-5'>
                            <span className='card p-3 mx-3 text-white !bg-indigo-600'><CiBoxList className='text-3xl' /></span>
                            <p className='text-lg'>Barra de navegação exclusiva do administrador e funcionário, onde pode acessar painéis que facilitam a manutenção e monitoração</p>
                        </div>
                        <div className='flex my-5'>
                            <span className='card p-3 mx-3 text-white !bg-indigo-600'><GoGraph className='text-3xl' /></span>
                            <p className='text-lg'>Temos um gráfico que facilita o monitoramento de vendas diárias, ajudando assim na contagem dos lucros que sua empresa está tendo.</p>
                        </div>
                        <div className='flex my-5'>
                            <span className='card p-3 mx-3 text-white !bg-indigo-600'><MdSell className='text-3xl' /></span>
                            <p className='text-lg'>Monitoramento de vendas, desde o pedido até a entrega, o que aumenta a praticidade da plataforma.</p>
                        </div>
                        <div className='flex my-5'>
                            <span className='card p-3 mx-3 text-white !bg-indigo-600'><AiFillEdit className='text-3xl' /></span>
                            <p className='text-lg'>Alterações nos produtos podem ser feitos com facilidade, não necessitando nenhum conhecimento em programação.</p>
                        </div>
                    </div>
                </div>
                <div className='col-span-2'>
                    <Image
                        src={admin1}
                        className="w-full "
                        alt="Sample image"
                        layout="responsive"
                        width={250}
                        height={420}
                    />
                </div>
            </div>
        </Layout>
    )
}
