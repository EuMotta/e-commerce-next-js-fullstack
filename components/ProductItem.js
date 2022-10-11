import React from "react"
import Link from 'next/link'
import Image from "next/image";
import { toast } from "react-toastify";
export default function productItem({ product, addToCartHandler }) {
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
                        <h2 className="text-xl text-center text-blue-800">{product.name}</h2>
                    </a>
                </Link> 
                <div className="text-center text-sm">Restam: {product.countInStock}</div>
                <div className="flex justify-between w-full pb-2">
                    <div className='flex items-center flex-col ml-2'>
                        <span className='text-sm text-red-600 line-through'>de: R$&nbsp;
                            {product.price}</span>
                        <span className='text-xl  text-green-600'>por: R$&nbsp;
                            {product.price * 0.9}</span>
                    </div>
                    {product.countInStock > 0 ? 
                    (
                    <button
                        className="primary-button"
                        type="button"
                        onClick={() => addToCartHandler(product)}
                    >
                        <i className="ri-shopping-cart-line"></i>
                    </button>
                    ):(
                        <button
                        className="primary-button cursor-not-allowed"
                        type="button"
                        onClick={() =>  toast.error(
                            'Produto indisponível!'
                        )}
                    >
                        <i className="ri-shopping-cart-line text-red-600"></i>
                    </button>
                    )}
                    
                </div>
            </div>
        </div>
    );
}