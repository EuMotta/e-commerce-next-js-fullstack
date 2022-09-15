import react from "react";
import Link from "next/link";
import 'remixicon/fonts/remixicon.css'


export default function ProductItem({ product }) {
    return (
        <div className="card">
            <Link href={`/product/${product.slug}`}>
                <a>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="rounded shadow"
                    />
                </a>
            </Link>
            <div>
                <Link href={`/product/${product.slug}`}>
                    <a>
                        <h2 className="text-lg">{product.name}</h2>
                    </a>
                </Link>
            </div>
        </div>

    );
}