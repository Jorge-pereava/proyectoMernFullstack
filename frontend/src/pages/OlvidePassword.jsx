import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Alerta from "../components/Alerta";

const OlvidePassword = () => {
  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({});

  const handelSubmit = async (e) =>{
    e.preventDefault();

    if(email == '' || email.length < 6){
      setAlerta({
        msg: 'El email es obligatorio', 
        error: true
      });

      return
    }


    //Validando el email para reestablacer el password
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/users/olvide-password`
      const {data} = await axios.post(url, {email})
      setAlerta({
        msg: data.msg,
        error: false
      })
      
      //console.log(data)

    } catch (error) {
      setAlerta({
        //console.log(error.response.data.msg)
        msg: error.response.data.msg,
        error:true
      })
    }

  }

  const {msg} = alerta

  return (
    <>
      <h1 className="text-sky-600 font-bold text-6xl capitalize">
        Recupera tu acceso y no pierdas tus {' '}
        <span className="text-slate-700 ">Proyectos</span>
      </h1>

      {msg && <Alerta alerta={alerta}/>}

      <form 
            className="my-10 bg-white shadow rounded-lg p-10"
            onSubmit={handelSubmit}
            >
        <div className="my-5">
          <label htmlFor="email" className="uppercase text-gray-700 block text-xl font-bold">Email</label>
          <input 
            id="email"
            type="email"
            placeholder="Ingrese su email" 
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <input 
          type="submit"
          value="Enviar instrucciones"
          className="bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
          <Link 
            to="/"
            className="block text-center my-5 text-slate-500 uppercase text-sm"
            >
            ¿Ya tienes una cuenta? Inicia Sesión</Link>

          <Link 
            to="/registrarse"
            className="block text-center my-5 text-slate-500 uppercase text-sm"
            >¿No tienes una cuenta? Registrate
          </Link>
      </nav>
      
    
    </>
  )
}

export default OlvidePassword