import Head from 'next/head'
import Link from 'next/link'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Store } from '../utils/Store'
import 'remixicon/fonts/remixicon.css'
import { ToastContainer } from 'react-toastify'
import { signOut, useSession } from 'next-auth/react'
import { Menu } from '@headlessui/react'
import DropdownLink from './DropdownLink'
import 'react-toastify/dist/ReactToastify.css'
import Cookies from 'js-cookie'
import Image from 'next/image'
import SideLinks from './SideLinks'


const nav_links = [
    {
        path: "/",
        display: "Home",
    },
    // {
    //     path: "categoria",
    //     display: "Categorias",
    // },
    // {
    //     path: "sobre",
    //     display: "Sobre",
    // },
    // {
    //     path: "contato",
    //     display: "Contatos",
    // },
]

export default function Layout({ title, children }) {
    const { state, dispatch } = useContext(Store)
    const { status, data: session } = useSession()
    const { cart } = state
    const year = new Date().getFullYear()
    const [cartItemsCount, setCartItemsCount] = useState(0)
    useEffect(() => {
        setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0))
    }, [cart.cartItems])
    const logoutClickHandler = () => {
        Cookies.remove('cart')
        dispatch({ type: 'CART_RESET' })
        signOut({ callbackUrl: '/login' })
    }
    const homeRef = useRef(null)
    const navRef = useRef(null)
    const rocketRef = useRef(null)
    const homeFunc = () => {
        if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
            homeRef.current.classList.add('home_shrink')
            navRef.current.classList.add('nav_shrink')
            rocketRef.current.classList.add('open')
        } else {
            homeRef.current.classList.remove('home_shrink')
            navRef.current.classList.remove('nav_shrink')
            rocketRef.current.classList.remove('open')
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', homeFunc)

        return () => window.removeEventListener('scroll', homeFunc)

    }, [])
    return (
        <>
            <Head>
                <title>{title ? title + ' e-commerce' : ' e-commerce'} </title>
                <meta name="description" content="E-commerce shop created by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <ToastContainer position='bottom-center' limit={3} />

            <div className='flex flex-col'>
                <header ref={homeRef} >
                    <nav ref={navRef} className="relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-100 text-gray-500 shadow-lg">
                        <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
                            <div className="container-fluid">
                                <Link href="/">
                                    <div className="text-4xl cursor-pointer text-black" ><span className='text-indigo-500 '>nf</span>Trade</div>
                                </Link>
                            </div>
                            <div className='menu flex gap-5'>
                                {
                                    nav_links.map((item, index) => (
                                        <ul key={index}>
                                            <li >
                                                <Link href={item.path}>
                                                    {item.display}
                                                </Link>
                                            </li>
                                        </ul>
                                    ))
                                }
                            </div>
                            <div className='flex'>
                                <Link href="/cart">
                                    <div className='p-2 cursor-pointer flex text-black text-2xl'>
                                        <i className="ri-shopping-cart-line"></i>
                                        {cartItemsCount > 0 && (
                                            <span
                                                style={{ color: 'white', background: 'red' }}
                                                className=' mb-5 rounded-full px-2  text-sm  font-bold'>
                                                {cartItemsCount}
                                            </span>
                                        )}

                                    </div>
                                </Link>
                                {status === 'loading' ?
                                    ('Carregando') :
                                    session?.user ?
                                        (
                                            <Menu as="div" className="relative  inline-block">
                                                <Menu.Button className="flex text-indigo-600 m-2">
                                                    <div className='mt-1 pr-2'>
                                                        {session.user.name}</div>
                                                    <Image
                                                        src={`/imgUser/${session.user.name}.png`}
                                                        width={30}
                                                        height={30}
                                                        unoptimized
                                                        className="shadow-black rounded-full"
                                                        alt="Foto de perfil"
                                                    />
                                                </Menu.Button>
                                                <Menu.Items className="absolute right-0  w-56 origin-top-right bg-white  shadow-lg ">
                                                    <Menu.Item>
                                                        <DropdownLink className="dropdown-link" href="/profile">
                                                            Perfil
                                                        </DropdownLink>
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        <DropdownLink
                                                            className="dropdown-link"
                                                            href="/orderHistory"
                                                        >
                                                            Histórico de pedidos
                                                        </DropdownLink>
                                                    </Menu.Item>
                                                    {session.user.isAdmin && (
                                                        <Menu.Item>
                                                            <DropdownLink
                                                                className="dropdown-link"
                                                                href="/admin/dashBoard"
                                                            >
                                                                Dashboard
                                                            </DropdownLink>
                                                        </Menu.Item>
                                                    )}
                                                    <Menu.Item>
                                                        <a
                                                            className="dropdown-link"
                                                            href="#"
                                                            onClick={logoutClickHandler}
                                                        >
                                                            Sair
                                                        </a>
                                                    </Menu.Item>
                                                </Menu.Items>
                                            </Menu>
                                        ) : (
                                            <Link href='/login'>
                                                <div className='p-2 text-black text-2xl'>
                                                    <a className='p-2 cursor-pointer'>
                                                        <i className="ri-login-box-line"></i>
                                                    </a>
                                                </div>
                                            </Link>
                                        )
                                }
                            </div>
                        </div>
                    </nav>
                </header>
                {session?.user.isAdmin ?
                    (
                        <session className="fixed block z-50 top-24">
                            <SideLinks />
                        </session>
                    ) : ("")
                }
                <main>
                    <div className='container min-h-screen m-auto mt-8 px-0'>{children}</div>
                </main>
                <footer className="flex justify-center items-center h-10 shadow-inner">
                    <div className=" bg-white  md:flex md:items-center md:justify-between  ">
                        <span className="text-sm text-gray-500 sm:text-center">© {year} <span className='text-indigo-600'>nf</span>Trade. Todos os direitos reservados.
                        </span>
                        <ul className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                            <li>
                                <a href="#" className="mr-4 hover:underline md:mx-6 ">José Antonio Motta</a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">Contato</a>
                            </li>
                        </ul>
                    </div>

                </footer>
                <button
                    ref={rocketRef}
                    onClick={() => { window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }) }}
                    className=" scroll-top !bg-indigo-600 scroll-to-target open">
                    <i className="ri-rocket-2-fill relative -top-1"></i>
                </button>
                <div className=" p-1 text-sm text-center  text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                    <span className="font-medium">Aviso!</span> Site em desenvolvimento.
                </div>
            </div>
        </>
    )
}
