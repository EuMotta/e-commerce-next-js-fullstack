import { getSession } from 'next-auth/react'
import Product from '../../../../models/Product'
import db from '../../../../utils/db'

const handler = async (req, res) => {
  const session = await getSession({ req })
  if (!session || !session.user.isAdmin) {
    return res.status(401).send('admin signin required')
  }

  if (req.method === 'GET') {
    return getHandler(req, res)
  } else if (req.method === 'POST') {
    return postHandler(req, res)
  } else {
    return res.status(400).send({ message: 'Method not allowed' })
  }
}

const postHandler = async (req, res) => {
  await db.connect()
  const newProduct = new Product({
    name: 'Digite um nome',
    image: '/img/nft.png',
    slug: 'Digite-uma-slug' + Number.parseInt(Math.random() * 100 + 1),
    title: 'Título do produto',
    gender: 'Gênero do produto',
    category: "NFT",
    price: 0,
    description: 'Produto gerado pela Post Handler nfTrade',
    rating: 0,
    numReviews: 0,
    countInStock: 1,
    publisher: 'Dono',
  })
  const product = await newProduct.save()
  await db.disconnect()
  res.send({ message: 'Produto criado.', product })
}
const getHandler = async (req, res) => {
  await db.connect()
  const products = await Product.find({})
  await db.disconnect()
  res.send(products)
}
export default handler
