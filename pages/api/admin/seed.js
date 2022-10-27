import { getSession } from "next-auth/react"
import Product from "../../../models/Product"
import User from "../../../models/User"
import data from "../../../utils/data"
import db from "../../../utils/db"

const handler = async (req, res) => {
    const session = await getSession({req})
    console.log(session)
    if (!session || (session && !session.user.isAdmin)){
        return (
            res.status(401).send("Erro: é necessário estar logado na conta do administrador para realizar essa função!")
        )
    }

    await db.connect()
    await User.deleteMany()
    await User.insertMany(data.users)
    await Product.deleteMany()
    await Product.insertMany(data.products)
    await db.disconnect()
    
    res.send({message: 'A SEED AGORA TA FUNFANDO!'})
}

export default handler
