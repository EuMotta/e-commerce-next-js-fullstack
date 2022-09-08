import React from 'react'

export default function Layout({ children }) {
    return (
        <>
            <Head>
                <title>{title ? title + ' e-commerce' : ' e-commerce'}</title>
                <meta name="description" content="e-commerce shop created by Next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <header>
                    header
                </header>
                <main>
                    {children}
                </main>
                <footer>
                    footer
                </footer>
            </div>
        </>
    )
}
