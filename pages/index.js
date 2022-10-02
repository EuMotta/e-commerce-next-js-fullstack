import Layout from "../components/Layout"
import ProductItem from "../components/productItem"
import data from '../utils/data'

export default function Home() {
  return (
    <div>
      <Layout title="Home">
        <div className="grid sm:grid-cols-3 grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          {
            data.products.map((product) => (
              <ProductItem product={product} key={product.slug}>
              </ProductItem>
            ))
          }
        </div>
      </Layout>
    </div>
  )
}
