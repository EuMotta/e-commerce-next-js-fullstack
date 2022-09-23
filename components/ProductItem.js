import React from "react"
import Link from 'next/link'
import 'remixicon/fonts/remixicon.css'
import Image from "next/image";

export default function ProductItem({ product }) {
    return (
        <div className="card">
            <Link href={`/product/${product.slug}`}>
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={350}
                        height={350}
                        className="rounded cursor-pointer card"
                    />
            </Link>
            <div className="mx-3">
                <Link href={`/product/${product.slug}`}>
                        <h2 className="text-lg">{product.name}</h2>
                </Link>
                <p className="mb-2">{product.publisher}</p>
                <div className="flex justify-between w-full">
                    <p className="text-xl">R$ {product.price}</p>
                    <button
                        className="primary-button"
                        type="button">
                        <i className="ri-shopping-cart-line"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}