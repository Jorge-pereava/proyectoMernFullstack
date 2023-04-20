import express from 'express';
import conectarDB from './config/db.js';
import router from './routers/usuariosRouter.js'
import ProyectoRouter from './routers/proyectoRouters.js';
import tareaRoutes from './routers/TareasRouters.js'
import dotenv from 'dotenv';
import cors from 'cors'

const app = express();

dotenv.config();

//Llamando a la base de datos
conectarDB()

//configuración de cors
const whiteList = ['http://127.0.0.1:5173']
const corsOptions = {
     origin: function(origin, callback){
          if(whiteList.includes(origin)){
               // console.log(origin)
               //Consultar la API
               callback(null, true) //Null porque no hay error y le damos el acceso con el true

          }else{
               //No puede acceder a la API
               callback(new Error('Error de politicas cors'))
          }
     }
}

app.use(cors(corsOptions))


//MIDDLEWARE
app.use(express.json())

//Rutas de acceso
app.use('/api/users',router)
app.use('/api/proyectos',ProyectoRouter)
app.use('/api/tareas',tareaRoutes)




//Servidor 
const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
   try {
        console.log(`Conectado correctamente al puerto ${PORT}`)
   } catch (error) {
        console.log(error)
   }
})