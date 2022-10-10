import React, { useContext } from 'react'
import Layout from '../../components/Layout'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Store } from '../../utils/Store'
import db from '../../utils/db'
import Product from '../../models/Product'
import imgErro from '../../public/img/404.svg'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function ProductScreen(props) {
    const { state, dispatch } = useContext(Store)
    const router = useRouter()
    const { product } = props
    if (!product) {
        return (
            <Layout title="Produto não encontrado">
                <div className='text-5xl text-center'>
                    <h1>Você se perdeu!</h1>
                </div>
                <div className='flex flex-col items-center'>
                    <Image
                        src={imgErro}
                        alt="imagem do produto"
                        width={500}
                        height={500}
                    ></Image>
                    <div className='text-9xl'>
                        <div className='py-2 text-2xl text-center'>
                            <Link href="/">
                                <button className=' bg-white hover:bg-red-500'> Voltar</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
    const addToCartHandler = async () => {
        const existItem = state.cart.cartItems.find((x) => x.slug === product.slug)
        const quantity = existItem ? existItem.quantity + 1 : 1
        const { data } = await axios.get(`/api/products/${product._id}`)
        if (data.countInStock < quantity) {
            return (
                toast.error(
                    'Produto indisponível!'
                )
            )
        }
        dispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...product, quantity }
        })
        router.push('/cart')
    }
    return (
        <Layout title={product.name}>
            <div className='flex'>
                <div className='py-2'>
                    <Link href="/">
                        <button className='bg-red-300 hover:bg-red-500'> Voltar</button>
                    </Link>
                </div>
                <h1 className='container mt-4 px-4 py-5 text-center text-3xl'>{product.name}</h1>
            </div>
            <div className='grid md:grid-cols-4 md:gap-3'>
                <div className='md:col-span-2 mb-5 shadow-gray-900 shadow-xl rounded border-8'>
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={640}
                        height={640}
                        layout="responsive"
                        className='img_ef'
                    >
                    </Image>
                </div>
                <div className='text-xl'>
                    <ul className='card p-5'>
                        <li className='card text-center'>
                            Tipo: <span className='text-indigo-600'>{product.category}</span>
                        </li>
                        <li>
                            Criador: {product.publisher}
                        </li>
                        <li>
                            {product.rating} de {product.numReviews} avalizações
                        </li>
                    </ul>
                    <ul className='card p-5'>
                        <li className='text-center card'>
                            <h2>Descrição:</h2>
                        </li>
                        <li>
                            {product.description}
                        </li>
                    </ul>
                </div>
                <div>
                    <div className='p-6 card'>
                        <div className='mb-2 flex justify-between'>
                            <div className='text-2xl' >Preço</div>
                            <div className='text-2xl text-red-600'>
                                {product.countInStock > 0 ? <div className='flex items-center flex-col ml-2'>
                                    <span className='text-sm text-red-600 line-through'>de: R$&nbsp;
                                        {product.price}</span>
                                    <span className='text-xl  text-green-600'>por: R$&nbsp;
                                        {product.price * 0.9}</span>
                                </div> : "Vendido"}
                            </div>
                        </div>
                        <div className='mb-2 flex justify-between'>
                            <div className='text-md'>Status</div>
                            <div>
                                {
                                    product.countInStock ?
                                        `Restantes ${product.countInStock}` :
                                        <span className='text-red-500'> Indisponível</span>
                                }
                            </div>
                        </div>
                        <div className='flex mt-7 text-center '>
                            <button onClick={addToCartHandler} className='w-full bg-sky-100 flex justify-between'>
                                Comprar
                                <i className="ri-shopping-cart-line"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    )
}
export async function getServerSideProps(context) {
    const { params } = context
    const { slug } = params
    await db.connect()
    const product = await Product.findOne({ slug }).lean()
    await db.disconnect()
    return {
        props: {
            product: product ? db.convertDocToObject(product) : null
        }
    }
}