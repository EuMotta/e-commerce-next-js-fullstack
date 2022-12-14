import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'
import Layout from '../components/Layout'
import { Store } from '../utils/Store'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useSession } from 'next-auth/react'

function CartScreen() {
    const router = useRouter()
    const { state, dispatch } = useContext(Store);
    const { data: session } = useSession()
    const { cart: { cartItems }, } = state;
    const removeItemHandler = (item) => {
        dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
    };

    const updateCartHandler = async (item, qty) => {
        const quantity = Number(qty);
        const { data } = await axios.get(`/api/products/${item._id}`);
        if (data.countInStock < quantity) {
            return toast.error('Não possuimos mais desse produto em estoque');
        }
        dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
        toast.success('Produto atualizado!');
    }

    return (
        <Layout title="Carrinho">
            <h1 className="mb-5 text-3xl">Carrinho de compras</h1>
            {
                cartItems.length === 0 ? (
                    <div className='text-center mb-5'>
                        <div className='mb-5 text-xl' >
                            O carrinho está vazio.
                        </div>
                        <Link href="/">
                            <buton className="primary-button cursor-pointer">Voltar</buton>
                        </Link>
                    </div>
                ) : (
                    <div className=''>
                        <div className="grid md:grid-cols-4 text-xl md:gap-5">
                            <div className="overflow-x-auto md:col-span-3">
                                <table className="min-w-full">
                                    <thead className="border-b border-indigo-800">
                                        <tr className='text-indigo-800 text-1xl'>
                                            <th className="px-5 text-center">Item</th>
                                            <th className="p-5 text-center">Quantidade</th>
                                            <th className="p-5 text-center">Preço Un.</th>
                                            <th className="p-5 text-center">Preço Total</th>
                                            <th className="p-5 text-center">Remover</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item) => (
                                            <tr key={item.slug} className="border-b border-indigo-800">
                                                <td>
                                                    <Link href={`/product/${item.slug}`}>
                                                        <div className="flex  cursor-pointer items-center">
                                                            <Image
                                                                src={item.image}
                                                                alt={item.name}
                                                                width={50}
                                                                height={50}
                                                            ></Image>
                                                            &nbsp;
                                                            {item.name}
                                                        </div>
                                                    </Link>
                                                </td>
                                                <td className="p-5  text-center">
                                                    <select
                                                        className='bg-white text-center px-1 text-xl'
                                                        value={item.quantity}
                                                        onChange={(e) =>
                                                            updateCartHandler(item, e.target.value)
                                                        }
                                                    >
                                                        {
                                                            [...Array(item.countInStock).keys()].map((x) => (
                                                                <option
                                                                    key={x + 1} value={x + 1}>{x + 1}
                                                                </option>
                                                            ))}
                                                    </select>
                                                </td>
                                                <td className="p-5 pointer-events-none  text-center">
                                                    $&nbsp;{(item.price - (item.price * item.descount) / 100).toFixed(2)}
                                                </td>
                                                <td className="p-5 pointer-events-none text-indigo-700 text-center">
                                                    $&nbsp;{((item.price - (item.price * item.descount) / 100) * item.quantity).toFixed(2)}
                                                </td>
                                                <td className="p-5 text-center">
                                                    <button onClick={() => removeItemHandler(item)}>
                                                        <div className='bg-none'>
                                                            <i className="ri-delete-bin-line"></i>
                                                        </div>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <ul className="card p-5">
                                    <li>
                                        <div className="pb-3 text-xl">
                                            Total ({cartItems.reduce((a, c) => a + c.quantity, 0)}) {" "}:
                                            ${cartItems.reduce((a, c) => a + c.quantity * (c.price - (c.price*c.descount/100)), 0).toFixed(2)}
                                        </div>
                                    </li>
                                    <li>
                                        <button
                                            onClick={session?.user ? (() => router.push('/shipping')) : (() => router.push('login?redirect=shipping'))}
                                            className="primary-button shadow-sm w-full"
                                        >
                                            Confirmar
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )
            }
        </Layout >
    )
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false })