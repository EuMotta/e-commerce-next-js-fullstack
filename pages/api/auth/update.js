import { getSession } from 'next-auth/react'
import bcryptjs from 'bcryptjs'
import User from '../../../models/User'
import db from '../../../utils/db'

async function handler(req, res) {
    if (req.method !== 'PUT') {
        return res.status(400).send({ message: `${req.method} Não suportado` })
    }
    const session = await getSession({ req });
    if (!session) {
        return res.status(401).send({ message: 'Erro: É necessário estar acessado em sua conta para realizar essa função!' })
    }
    const { user } = session
    const { name, lastName, email, password } = req.body
    if (
        !name ||
        !lastName ||
        !email ||
        !email.includes('@') ||
        (password && password.trim().length < 7)
    ) {
        res.status(422).json({
            message: 'Erro de validação',
        })
        return
    }
    await db.connect()
    const toUpdateUser = await User.findById(user._id)
    toUpdateUser.name = name
    toUpdateUser.image = `/imgUser/${session.user.name}.jpg`
    toUpdateUser.lastName = lastName
    toUpdateUser.email = email
    if (password) {
        toUpdateUser.password = bcryptjs.hashSync(password)
    }
    await toUpdateUser.save()
    await db.disconnect()
    res.send({
        message: 'Informações atualizadas com sucesso!',
    })
}

export default handler