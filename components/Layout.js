import React from 'react'

export default function Layout({ children }) {
    return (
        <>
            <title>Home</title>
            <div>
                <header>
                    <nav class="relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-100 text-gray-500  shadow-lg">
                        <div class="container-fluid w-full flex flex-wrap items-center justify-between px-6">
                            <div class="container-fluid">
                                <a class="text-xl text-black" href="#">e-commerce shop</a>

                            </div>
                            <div className='' style={{rowGap:'1rem'}}>
                                <a className='px-3 cursor-pointer hover:text-blue-500' >Home</a>
                                <a className='px-3 cursor-pointer hover:text-blue-500'>Shop</a>
                                <a className='px-3 cursor-pointer hover:text-blue-500'>Features</a>
                                <a className='px-3 cursor-pointer hover:text-blue-500'>About</a>
                                <a className='px-3 cursor-pointer hover:text-blue-500'>Contact</a>
                            </div>
                            <div>
                                <p>Login</p>
                            </div>

                        </div>
                    </nav>
                </header>
                <main>
                    {children}
                    main
                </main>
                <footer>
                    footer
                </footer>
            </div>
        </>
    )
}
