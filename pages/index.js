import axios from "axios"
import { useContext } from "react"
import { toast } from "react-toastify"
import Layout from "../components/Layout"
import Product from "../models/Product"
import db from "../utils/db"
import { Store } from "../utils/Store"
import Hero from '../components/Hero'
import ProductItem from "../components/ProductItem";

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
       <Hero/>
        {/* <div className="text-center my-10">
          <h1 className="text-5xl">Procurando <span className="text-indigo-600">NFT'S</span>? Confira abaixo!</h1>
        </div> */}
        <div className="mb-7"><h1 className="text-4xl">Destaques</h1></div>
        <div className="grid sm:grid-cols-3  grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
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