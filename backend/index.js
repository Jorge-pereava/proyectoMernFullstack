import express from 'express';
import conectarDB from './config/db.js';
import router from './routers/usuariosRouter.js'
import ProyectoRouter from './routers/proyectoRouters.js';
import dotenv from 'dotenv';

const app = express();

dotenv.config();

//Llamando a la base de datos
conectarDB()


//MIDDLEWARE
app.use(express.json())

//Rutas de acceso
app.use('/api/users',router)
app.use('/api/proyectos',ProyectoRouter)




//Servidor 
const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
   try {
        console.log(`Conectado correctamente al puerto ${PORT}`)
   } catch (error) {
        console.log(error)
   }
})