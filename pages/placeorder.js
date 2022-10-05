import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'
import CheckoutWizard from '../components/CheckoutWizard'
import Layout from '../components/Layout'
import { Store } from '../utils/Store'

export default function PlaceOrderScreen() {
    const { state, dispatch } = useContext(Store)
    const { cart } = state
    const { cartItems, shippingAddress, paymentMethod } = cart
    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100
    const itemsPrice = round2(
        cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
    )
    const shippingPrice = itemsPrice > 200 ? 0 : 15
    const taxPrice = round2 (itemsPrice*0.15)
    return (
        <Layout title='Revisão do pedido'>
            <CheckoutWizard activeStep={3} />
            <h1 className='w-full'>Revisão do pedido</h1>
            {cartItems.length === 0 ?
                (
                    <div>O carrinho está vazio.
                        <Link href='/'>
                            Voltar
                        </Link>
                    </div>
                ) : (
                    <div className='grid md:grid-cols-4 md:gap-5'>
                        <div className='overflow-x-auto md:col-span-3'>
                            <div className='card p-5 m-2'>
                                <h2>Endereço de entrega</h2>
                                <div>
                                    {shippingAddress.name},
                                    {shippingAddress.address},
                                    {shippingAddress.neighborhood},
                                    {shippingAddress.city},
                                    {shippingAddress.postalCode},
                                    {shippingAddress.number},
                                    {shippingAddress.state},
                                </div>
                                <div>
                                    <Link href='/shipping'>Editar</Link>
                                </div>
                            </div>
                            <div className='card p-5 m-2'>
                                <h2>Método de pagamento</h2>
                                <div>
                                    {paymentMethod}
                                </div>
                                <div>
                                    <Link href='/payment'>
                                        <div>Editar</div>
                                    </Link>
                                </div>
                            </div>
                            <div className='card p-5 m-2'>
                                <h2>Lista de produtos</h2>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Item</th>
                                            <th>Quantidade</th>
                                            <th>Preço</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item) => (
                                            <tr key={item._id}>
                                                <tb>
                                                    <Link href={`/product/${item.slug}`}>
                                                        <Image src={item.image} alt={item.name} width={50} height={50}></Image>
                                                    </Link>
                                                </tb>
                                                <tb>{item.quantity}</tb>
                                                <tb>R$ {item.price}</tb>
                                                <tb>Total: R$ {item.quantity * item.price}</tb>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
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
                                        <div></div>
                                    </li>
                                    <li>
                                        <div></div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                )}
        </Layout>
    )
}
