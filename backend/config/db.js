import mongoose from "mongoose";

const conectarDB = async()=>{
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        const url = `${connection.connection.port}:${connection.connection.host}`
        console.log(`Conectado correctamente a la BD: ${url}`)

    } catch (error) {
        console.log(`Hubo un error al conectar la BD... ${error}`)
        process.exit(1)
    }
}

export default conectarDB;