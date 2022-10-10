import React from "react"
import Link from 'next/link'
import 'remixicon/fonts/remixicon.css'
import Image from "next/image";
// npm cache clean --force
// npm install
export default function productItem({ product, addToCartHandler }) {
    return (
        <div className="card">
            <Link href={`/product/${product.slug}`}>
                <div className="cursor-pointer">
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={350}
                        height={350}
                        className="rounded card"
                    />
                </div>
            </Link>
            <div className="mx-2">
                <Link href={`/product/${product.slug}`}>
                    <a>
                        <h2 className="text-xl text-center text-blue-800">{product.name}</h2>
                    </a>
                </Link>
                <p className="mb-2 text-center text-sm">Dono atual: {product.publisher}</p>
                <div className="flex justify-between w-full pb-2">
                    <div className='flex items-center flex-col ml-2'>
                        <span className='text-sm text-red-600 line-through'>de: R$&nbsp;
                            {product.price}</span>
                        <span className='text-xl  text-green-600'>por: R$&nbsp;
                            {product.price * 0.9}</span>
                    </div>
                    <button
                        className="primary-button"
                        type="button"
                        onClick={() => addToCartHandler(product)}
                    >
                        <i className="ri-shopping-cart-line"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}