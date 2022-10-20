import Image from 'next/image'
import React from 'react'
import Layout from '../components/Layout'
import aboutimg from '../public/img/aboutimg.svg'
import aboutme from '../public/img/aboutme.jpg'


export default function AboutScreen() {
    return (
        <Layout>
            <section className="grid grid-cols-1 mb-5 md:grid-cols-1 bg_img lg:grid-cols-2 sm:grid-cols-1 gap-4">
                <div className="col-span-1 text-center">
                    <Image
                        src={aboutimg}
                        className="w-full login_img"
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
                            Conheça um pouco sobre meu projeto nfTrade.
                        </p>
                    </div>
                </div>
            </section>
            <div className='border rounded-lg shadow-sm shadow-slate-600 grid mx-10 grid-cols-6'>
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

                <div className='col-span-3'>
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
        </Layout>
    )
}
