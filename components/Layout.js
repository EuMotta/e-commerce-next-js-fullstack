import Head from 'next/head'
import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../utils/Store'

const navbar_links = [
    {
        path: "#home",
        display: "Home",
    },
    {
        path: "#shop",
        display: "About",
    },
    {
        path: "#features",
        display: "Services",
    },
    {
        path: "#contact",
        display: "contato",
    },
]
export default function Layout({ children, title }) {
    const { state } = useContext(Store)
    const { cart } = state
    const year = new Date().getFullYear()
    const { cartItemsCount, setCartItensCount } = useState(0)
    useEffect(() => {
        setCartItensCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0))
    }, [cart.cartItems])
    return (
        <>
            <Head>
                <title>{title ? title + ' e-commerce' : ' e-commerce'}</title>
                <meta name="description" content="e-commerce shop created by Next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <header>
                    <nav class="relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-100 text-gray-500  shadow-lg">
                        <div class="container-fluid w-full flex flex-wrap items-center justify-between px-6">
                            <div class="container-fluid">
                                <a class="text-xl text-black" href="#">e-commerce shop</a>

                            </div>
                            <ul className="flex gap-6 ">
                                {
                                    navbar_links.map((item, index) => (
                                        <li key={index}>
                                            <a className='menu ' href={item.path}>
                                                {item.display}
                                            </a>
                                        </li>
                                    ))}
                            </ul>
                            <div>
                                <Link href='/cart'>
                                    <a className='p-2 text-2xl'>
                                        {cartItemsCount > 0 && (
                                            <span>{cartItemsCount}</span>   
                                        )}
                                    </a>
                                </Link>
                                {/* <Link href='/login'>

                                </Link> */}
                            </div>
                        </div>
                    </nav>
                </header>


                <main>
                    <h1 className='text-center text-3xl py-10'>Requisições do banco de dados</h1>
                    <div className='container m-auto mt-4  px-4'>
                        {children}
                    </div>

                </main>



                <footer className="flex text-xl h-10 justify-center items-center shadow-inner">
                    <p style={{ color: 'var(--primary-color)' }}>Copyright © {year} José Antonio</p>
                </footer>
            </div>
        </>
    )
}
