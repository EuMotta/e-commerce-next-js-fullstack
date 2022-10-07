import axios from 'axios'
import Cookies from 'js-cookie'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import CheckoutWizard from '../components/CheckoutWizard'
import Layout from '../components/Layout'
import { getError } from '../utils/error'
import { Store } from '../utils/Store'

export default function PlaceOrderScreen() {
    const { state, dispatch } = useContext(Store)
    const { cart } = state
    const { cartItems, shippingAddress, paymentMethod } = cart
    const router = useRouter()
    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100
    const itemsPrice = round2(
        cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
    )
    const shippingPrice = itemsPrice > 200 ? 0 : 15
    const taxPrice = round2(itemsPrice * 0.15)
    const totalPrice = round2(itemsPrice + shippingPrice + taxPrice)
    const descount = round2(totalPrice * 0.9)
    useEffect(() => {
        if (!paymentMethod) {
            router.push('/payment')
        }
    }, [paymentMethod, router])
    const [loading, setLoading] = useState(false)
    const placeOrderHandler = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post('/api/orders', {
                orderItems: cartItems,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice,
                descount,
            })
            setLoading(false)
            dispatch({ type: 'CART_CLEAR_ITEMS' })
            Cookies.set(
                'cart',
                JSON.stringify({
                    ...cart,
                    cartItems: [],
                })
            )
            router.push(`/order/${data._id}`)
        } catch (err) {
            setLoading(false)
            toast.error(getError(err))
        }
    }
    return (
        <Layout title='Revisão do pedido'>
            <CheckoutWizard activeStep={3} />
            <h1 className='w-full mb-5 text-center text-4xl text-indigo-600 '>Revisão do pedido</h1>
            {cartItems.length === 0 ? (
                <div>
                    O carrinho está vazio.
                    <Link href='/'>
                        Voltar
                    </Link>
                </div>
            ) : (
                <div className='grid md:grid-cols-4 md:gap-5'>
                    <div className='overflow-x-auto md:col-span-3'>
                        <div className='card p-5 m-2 text-2xl text-indigo-500 text-center '> <h2>Lista de produtos</h2>
                            <table className='min-w-full'>
                                <thead className='border-y border-indigo-800'>
                                    <tr className='text-indigo-800 text-1xl'>
                                        <th className="px-5 text-center">Item</th>
                                        <th className="p-5 text-center">Quantidade</th>
                                        <th className="p-5 text-center">Preço</th>
                                        <th className="p-5 text-center">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item) => (
                                        <tr key={item._id} className='border-y   border-indigo-700'>
                                            <td className='m-5'>
                                                <Link href={`/product/${item.slug}`} >
                                                    <Image src={item.image} alt={item.name} width={50} height={50}></Image>
                                                </Link>
                                            </td>
                                            <td className="p-5 text-black only:text-center">{item.quantity}</td>
                                            <td className="p-5 text-black text-center">R${item.price}</td>
                                            <td className="p-5 text-black text-center">
                                                R${item.quantity * item.price}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            
                            <div className='text-end mr-16 pr-2'>R$:{itemsPrice}</div>
                        </div>
                        <div className='grid ml-12 mx-2 grid-cols-2'>
                            <div>
                                <div className='card p-5'>
                                    <h2 className='text-center text-2xl text-indigo-800'>Endereço de entrega</h2>
                                    <div className=' items-left grid grid-cols-2 gap-4 flex-col  mb-2'>
                                        <div class="col-span-1">
                                            <div className='text-indigo-800'>Nome:&nbsp;
                                                <span className='text-black'>{shippingAddress.name}</span>
                                            </div>
                                            <div className='text-indigo-800 gap'>Endereço:&nbsp;
                                                <span className='text-black'>{shippingAddress.address}</span>
                                            </div>
                                            <div className='text-indigo-800'>Bairro:&nbsp;
                                                <span className='text-black'>{shippingAddress.neighborhood}</span>
                                            </div>
                                            <div className='text-indigo-800'>Cidade:&nbsp;
                                                <span className='text-black'>{shippingAddress.city}</span>
                                            </div>
                                        </div>
                                        <div className=' col-span-1 ml-10'>
                                            <div className='text-indigo-800'>CEP:&nbsp;
                                                <span className='text-black'>{shippingAddress.postalCode}</span>
                                            </div>
                                            <div className='text-indigo-800'>Número:&nbsp;
                                                <span className='text-black'>{shippingAddress.number}</span>
                                            </div>
                                            <div className='text-indigo-800'>Estado:&nbsp;
                                                <span className='text-black'>{shippingAddress.state}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <Link href='/shipping'>
                                            <button className='cursor-pointer  w-full'>
                                                Editar
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className='card p-5 mx-10  w-auto'>
                                <h2 className="mb-2 text-center text-2xl text-indigo-800">Método de pagamento</h2>
                                <div className="mt-8   text-center text-xl ">
                                    <Link href='/payment'>
                                        <span className='border border-indigo-800 shadow-sm bg-slate-100 hover:cursor-pointer hover:bg-slate-50 shadow-slate-900 p-3'>
                                            {paymentMethod}
                                        </span>
                                    </Link>
                                </div>
                                <div className="mt-10 grid text-center text-xl">
                                    <Link href='/payment'>
                                        <button className='cursor-pointer w-full'>
                                            Editar
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div>
                        <div className='card p-5 mt-2'>
                            <h2>Resumo do Pedido:</h2>
                            <ul>
                                <li>
                                    <div>
                                        <div>Itens</div>
                                        <div>R$:{itemsPrice}</div>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <div>Taxa</div>
                                        <div>R$:{taxPrice}</div>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <div>Entrega</div>
                                        <div>R$:{shippingPrice}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="mb-2 flex text-xl justify-between">
                                        <div>Total</div>
                                        <div className='flex flex-col align-middle items-end'>
                                            <span className='text-md text-red-500 line-through'>de: R$&nbsp;
                                                {totalPrice}</span>
                                            <span className='text-xl text-green-600'>por: R$&nbsp;
                                                {descount}</span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <button disabled={loading} onClick={placeOrderHandler} className='cursor-pointer w-full'>
                                            {loading ? 'Carregando...':'Realizar pedido'}
                                        </button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            )}
        </Layout>
    )
}

PlaceOrderScreen.auth = true;