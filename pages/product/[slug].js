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
import { GrContact } from 'react-icons/gr'
import { FcPaid } from 'react-icons/fc'

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

            </div>
            <div className='grid md:grid-cols-5 md:gap-3'>
                <div className='md:col-span-2 mb-5 shadow-slate-700 shadow-md rounded border-8'>
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
                <div className='col-span-3'>
                    <div className='flex '>
                        <div className='text-xl w-3/5 mr-3'>
                            <ul className='card p-5'>
                                <h1 className='container mb-2 text-center text-3xl'>{product.name}</h1>
                                <li className=' border rounded shadow-sm shadow-slate-400 text-center'>
                                    Tipo: <span className='text-indigo-600'>{product.category}</span>
                                </li>
                                <li className='py-2'>
                                    <span className='text-indigo-600'>Criador:</span> {product.publisher}
                                </li>
                                <li className='py-2'>
                                    <span className='text-indigo-600'>Título:</span> {product.title}
                                </li>
                                <li className='py-2'>
                                    <span className='text-indigo-600'>Gênero:</span> {product.gender}
                                </li>
                                <li className='py-2'>
                                    {product.rating} de {product.numReviews} avaliações
                                </li>
                            </ul>
                        </div>
                        <div className='w-2/5'>
                            <div className='p-6 card'>
                                <div className=' flex justify-between'>
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
                                    <button onClick={addToCartHandler} className='w-full gap-1 primary-button  flex justify-center'>
                                    <FcPaid className="text-xl"/>  Carrinho
                                    </button>
                                </div>
                            </div>
                            <div className='card p-3 text-center'>
                            <div className='flex justify-center'><GrContact/></div>
                                <button className='primary-button cursor-not-allowed'>Conversar com vendedor</button>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='col-span-6 border-y w=full'>
                    <div className='grid mt-10 mx-10 grid-cols-4'>
                        <ul className='col-span-3 ml-10 mt-16 p-5'>
                            <li className='text-xl mb-1 '>
                                <h2>Descrição:</h2>
                            </li>
                            <li>
                                {product.description}
                            </li>
                        </ul>
                        <ul className='col-span-1'>
                            <Image
                                src={product.image}
                                alt={product.name}
                                width={640}
                                height={640}
                                layout="responsive"
                                className='img_ef'
                            >
                            </Image>
                        </ul>
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