import axios from "axios"
import { useContext } from "react"
import { toast } from "react-toastify"
import Layout from "../components/Layout"
import ProductItem from "../components/productItem"
import Product from "../models/Product"
import db from "../utils/db"
import { Store } from "../utils/Store"
import nftimg from '../public/img/NFT-bro.svg'
import Image from "next/image"

export default function Home({ products }) {
  const { state, dispatch } = useContext(Store)
  const { cart } = state
  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug)
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
    toast.success('Produto adicionado ao carrinho!')
  }
  return (
    <div>
      <Layout title="Home">
        <div class="grid grid-cols-4 mb-32  gap-4">
          <div class="col-span-2 text-right">
            <Image
              src={nftimg}
              className="w-full login_img"
              alt="Sample image"
            />
          </div>
          <div class="col-span-2">
            <div className=" my-10">
              <h1 className="text-5xl">Descubra, colecione e venda <span className="text-indigo-600">NFT'S Incríveis!</span></h1>
              <p className="text-2xl mt-10 w-96">em uma uma das maiores plataformas NFT do mundo.</p>
              <div className="flex mt-10">
                <div className="mr-4">
                  <button className="p-5 px-16 text-xl">Descobrir</button>
                </div>
                <div className="mx-4">
                  <button className="p-5 px-16 bg-indigo-600 text-white text-xl">Descobrir</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="text-center my-10">
          <h1 className="text-5xl">Procurando <span className="text-indigo-600">NFT'S</span>? Confira abaixo!</h1>
        </div> */}
        <div className="mb-7"><h1 className="text-4xl">Destaques</h1></div>
        <div className="grid sm:grid-cols-3 grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
          {
            products.map((product) => (
              <ProductItem product={product} key={product.slug} addToCartHandler={addToCartHandler}>
              </ProductItem>
            ))
          }
        </div>
      </Layout>
    </div>
  )
}
export async function getServerSideProps() {
  await db.connect()
  const products = await Product.find().lean()
  return {
    props: {
      products: products.map(db.convertDocToObject)
    }
  }
}