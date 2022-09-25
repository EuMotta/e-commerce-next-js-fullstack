import NextAuth from "next-auth"
import User from "../../../models/User"
import db from "../../../utils/db"
import bcryptjs from 'bcryptjs'
import CredentialsProvider from 'next-auth/providers/credentials'
// jwt = JSON-WEB-TOKEN
export default NextAuth({
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user?._id) token._id = user._id
            if (user?.isAadmin) token.isAadmin = user.isAadmin
            return token
        },
        async session({ session, token }) {
            if (token._id) session._id = token._id
            if (token?.isAadmin) session.isAadmin = token.isAadmin
            return session
        },
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                await db.connect()
                const user = await User.findOne({
                    email: credentials.email,
                })
                await db.disconnect()
                if(user&&bcryptjs.compareSync(credentials.password,user.password)){
                    return{
                        _id:user._id,
                        name:user.name,
                        email:user.email,
                        image:'foto',
                        isAdmin:user.isAdmin,
                    }
                }
                throw new Error('email ou senha inválidos')
            }
        })
    ]
})