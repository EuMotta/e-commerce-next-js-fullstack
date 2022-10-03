import axios from "axios"
import { useContext } from "react"
import { toast } from "react-toastify"
import Layout from "../components/Layout"
import ProductItem from "../components/productItem"
import Product from "../models/Product"
import db from "../utils/db"
import { Store } from "../utils/Store"

export default function Home({products}) {
  const { state, dispatch } = useContext(Store)
  const {cart} = state
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
        <div className="grid sm:grid-cols-3 grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
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