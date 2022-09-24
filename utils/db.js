import mongoose from "mongoose";

const connection = {}

async function connect(){
    if(connection.isConnected){
        console.log('Conectou, Ore!')
        return
    }
    if(mongoose.connections.length > 0){
        connection.isConnected = mongoose.connections[0].readyState
        if(connection.isConnected === 1){
            console.log('DB has been connected')
            return
        }
        await mongoose.disconnect()
    }
    const db = await mongoose.connect(process.env.MONGODB_URI)
    console.log('Nova conexão')
    connection.isConnected = mongoose.connections[0].readyState
}

async function disconnect(){
    if(connection.isConnected){
        if(process.env.NODE_ENV === 'production'){
            await mongoose.disconnect()
            connection.isconnected = false
        }else{
            console.log('Não desconectou')
        }
    }
}

const db = {connect,disconnect}
export default db