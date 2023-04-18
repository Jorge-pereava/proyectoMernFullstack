import { Link } from "react-router-dom";
import { useState } from "react";


const Registar = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword]= useState('');
  const [repetirPassword, setRepetirPassword] = useState('')

  return (
    <>
      <h1 className="text-sky-600 font-bold text-6xl capitalize">
        Crea tu cuenta y administra tus {' '}
        <span className="text-slate-700 ">Proyectos</span>
      </h1>

      <form className="my-10 bg-white shadow rounded-lg p-10">
        <div className="my-5">
            <label htmlFor="nombre" className="uppercase text-gray-700 block text-xl font-bold">Nombre</label>
            <input 
              id="nombre"
              type="text" 
              placeholder="Ingresa tu nombre"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
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