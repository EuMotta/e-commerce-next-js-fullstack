import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import Layout from '../components/Layout'
import { Store } from '../utils/Store'
import dynamic from 'next/dynamic'

function CartScreen() {
    const router = useRouter()
    const { state, dispatch } = useContext(Store)
    const { cart: { cartItems }, } = state
    const removeItemHandler = (item) => {
        dispatch({
            type: 'CART_REMOVE_ITEM',
            payload: item
        })
     }
    const updateCartHandler = (item, qty) => {
        const quantity = Number(qty)
        dispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...item, quantity }
        })
    }
    return (
        <Layout title='Carrinho'>
            <h1>Carrinho de compras</h1>
            {
                cartItems.length === 0 ? (
                    <div className='text-center'>
                        O carrinho está vazio.
                        <Link href='/'>
                            <button>
                                Voltar
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className='grid md:grid-cols-4 text-xl md:gap-5'>
                        <div className='overflow-x-auto md:col-span-3'>
                            <table className='min-w-full'>
                                <thead className='border-b'>
                                    <tr>
                                        <th className='p-5 text-center'>
                                            Item
                                        </th>
                                        <th className='p-5 text-center'>
                                            Quantidade
                                        </th>
                                        <th className='p-5 text-center'>
                                            Preço
                                        </th>
                                        <th className='p-5 text-center'>
                                            Excluir
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cartItems.map((item) => (
                                            <tr key={item.slug} className='border-b'>
                                                <td>
                                                    <Link href={`/product/${item.slug}`}>
                                                        <a className='flex items-center'>
                                                            <Image
                                                            src={item.image}
                                                            alt={item.name}
                                                            width={50}
                                                            height={50}
                                                            >
                                                            </Image>&nbsp;{item.name}
                                                        </a>
                                                    </Link>
                                                </td>
                                                <td className='p-5 text-right'>
                                                    
                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className='card p-5'>

                        </div>
                    </div>
                )
            }
        </Layout>
    )
}
export default dynamic(() => Promise.resolve(CartScreen),{ssr:false})