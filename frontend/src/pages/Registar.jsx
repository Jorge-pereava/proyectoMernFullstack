import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta";
import axios from "axios";

const Registar = () => {
  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword]= useState('');
  const [repetirPassword, setRepetirPassword] = useState('')
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async e =>{
    e.preventDefault();

    if([name, email, password,repetirPassword].includes('')){
      setAlerta({
        msg: 'Todos los campos deben ser obligatorios',
        error: true
      })
      return
    }

    if(password !== repetirPassword){
      setAlerta({
        msg: 'Los password no son  iguales',
        error: true
      })
      return
    }

    if(password.length <6){
      setAlerta({
        msg: 'El password debe tener más de 6 caracteres',
        error: true
      })
      return
    }

    setAlerta({ })

    //Creando usuario en la API
    try {
      const {data} = await axios.post('http://localhost:4000/api/users/register' , {name, password, email}) //Obtengo el data para poder ver directamente la información que viene desde la data y no información que no requiero
      setAlerta({
        msg: data.msg,
        error:false
      })
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const{msg} = alerta //Extraigo el mensaje de la alerta, en este momento no va a estar vacia por esto le extraigo su valor para poder mostrar el mensaje

  return (
    <>
      <h1 className="text-sky-600 font-bold text-6xl capitalize">
        Crea tu cuenta y administra tus {' '}
        <span className="text-slate-700 ">Proyectos</span>
      </h1>

      {/* MENSAJE DE ALERTA */}
      {msg && <Alerta alerta={alerta}/>}

      <form 
        className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
            <label htmlFor="nombre" className="uppercase text-gray-700 block text-xl font-bold">nombre</label>
            <input 
              id="nombre"
              type="text" 
              placeholder="Ingresa tu nombre"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={name}
              onChange={e => setname(e.target.value)}
            />
        </div>

        <div className="my-5">
          <label htmlFor="email" className="uppercase text-gray-700 block text-xl font-bold">Email</label>
          <input 
            id="email"
            type="email"
            placeholder="Ingrese su email" 
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50" 
            value={email}
            onChange={e=> setEmail(e.target.value)}
          />
        </div>

        <div className="my-5">
          <label htmlFor="password" className="uppercase text-gray-700 block text-xl font-bold">Password</label>
          <input 
            id="password"
            type="password"
            placeholder="Ingrese su password" 
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50" 
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div className="my-5">
          <label htmlFor="password2" className="uppercase text-gray-700 block text-xl font-bold">Repetir Password</label>
          <input 
            id="password2"
            type="password"
            placeholder="Repita su password" 
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50" 
            value={repetirPassword}
            onChange={e=>setRepetirPassword(e.target.value)}
          />
        </div>
        <input 
          type="submit"
          value="Crear cuenta"
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
            to="/Olvide-Password"
            className="block text-center my-5 text-slate-500 uppercase text-sm"
            >
            Olvide mi password</Link>
      </nav>
      
    
    </>
  )
}

export default Registar