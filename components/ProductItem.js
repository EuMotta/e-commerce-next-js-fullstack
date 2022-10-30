import React from "react"
import Link from 'next/link'
import Image from "next/image"
import { toast } from "react-toastify"
import { TbShoppingCartOff } from 'react-icons/tb'

export default function ProductItem({ product, addToCartHandler }) {
    return (
        <div className="card p-5 hover:-translate-y-2 ">
            <p className="mb-2 px-2 pt-2 text-sm">Vendedor: <span className="text-xl">@</span>{product.publisher}</p>
            <Link href={`/product/${product.slug}`}>
                <div className="cursor-pointer">
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={400}
                        height={400}
                        layout='responsive'
                        className="card"
                    />
                </div>
            </Link>
            <div className="mx-2">
                <Link href={`/product/${product.slug}`}>
                    <a>
                        <h2 className="text-xl my-3 text-center text-indigo-600">{product.name}</h2>
                    </a>

                </Link>
                <a>
                    <h2 className="my-3 text-slate-800">{product.description.substring(0, 56)}...</h2>
                </a>
                <div className="">
                    <div className="justify-between mt-5 ml-2 w-full pb-2">
                        <div className='flex flex-col '>
                            <span className='text-sm text-red-600 line-through'>de: R$&nbsp;
                                {product.price}</span>
                            <span className='text-3xl  text-green-600'>por: R$&nbsp;
                                {product.price * 0.9}</span>
                        </div>
                    </div>
                    {product.countInStock > 0 ?
                        (
                            <button
                                className="primary-button w-full"
                                type="button"
                                onClick={() => addToCartHandler(product)}
                            >
                                <i className="ri-shopping-cart-line"></i> Comprar
                            </button>
                        ) : (
                            <button
                                className="primary-button w-full hover:  cursor-not-allowed text-red-600"
                                type="button"
                                onClick={() => toast.error(
                                    'Produto indisponível!'
                                )}
                            >
                                <span className="flex justify-center gap-2"><TbShoppingCartOff/>Indisponível</span>
                            </button>
                        )}
                    {product.countInStock > 0 ?
                        (<div className="text-sm text-center">Restam: {product.countInStock}</div>
                        ) : (
                            <div className="text-sm text-center">Sem estoque</div>
                        )}
                </div>
            </div>
        </div>
    );
}