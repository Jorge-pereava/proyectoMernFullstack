
const Login = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Inicia sesión y administra tus {' '}
        <span className="text-slate-700">proyectos</span>
      </h1>

      <form className="my-10 bg-white shadow rounded-lg p-10 ">
        <div className="my-5">
          <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">EMAIL</label>
          <input 
            id="email"
            type="email"
            placeholder="Ingrese su email"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"

            />
        </div>
        <div className="my-5">
          <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">PASSWORD</label>
          <input 
            id="password"
            type="password"
            placeholder="Ingrese su password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"

            />
        </div>
        <input 
          type="submit"
          value="Iniciar Sesión"
          className="bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"        
        />
      </form>
    </>
  )
}

export default Login