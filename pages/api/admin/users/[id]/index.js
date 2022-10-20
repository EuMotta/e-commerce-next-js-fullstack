import db from "../../../../../utils/db"
import { getSession } from "next-auth/react"
import User from "../../../../../models/User"

const handler = async (req, res) => {
  const session = await getSession({ req })
  if (!session || !session.user.isAdmin) {
    return res.status(401).send("Acesse sua conta.")
  }

  const { user } = session

  if (req.method === 'GET') {
    return getHandler(req, res, user)
  } else if (req.method === 'DELETE') {
    return deleteHandler(req, res)
  } else if (req.method === 'PUT') {
    return putHandler(req, res, user)
  } else {
    return res.status(400).send({ message: 'Não permitido' })
  }
}

const putHandler = async (req, res) => {
  await db.connect()
  const user = await User.findById(req.query.id)
  if (user) {
    user.name = req.body.name
    user.lastName = req.body.lastName
    user.image = req.body.image
    user.email = req.body.email
    user.password = req.body.password
    user.isAdmin = req.body.isAdmin
    await user.save()
    await db.disconnect()
    res.send({ message: "As informações do usuário foram atualizadas com sucesso!" })
  } else {
    await db.disconnect()
    res.status(404).send({ message: "Usuário não encontrado!" })
  }
}

const getHandler = async (req, res) => {
  await db.connect()
  const user = await User.findById(req.query.id)
  await db.disconnect()
  res.send(user)
}

const deleteHandler = async (req, res) => {
  await db.connect()
  const user = await User.findById(req.query.id)
  if (user) {
    if (
      user.email === "adminnfTrade@example.com"
    ) {
      return res.status(400).send({
        message: "Você não pode deletar este usuário.",
      })
    }
    await user.remove();
    await db.disconnect();
    res.send({ message: "Usuário deletado." })
  } else {
    await db.disconnect();
    res.status(404).send({ message: "Usuário não encontrado." })
  }
}

export default handler
