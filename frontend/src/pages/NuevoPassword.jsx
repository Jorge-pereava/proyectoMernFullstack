
const NuevoPassword = () => {
  return (
    <>
      <h1 className="text-sky-600 font-bold text-6xl capitalize">
        Reestablece tu password y ten acceso a tus {' '}
        <span className="text-slate-700 ">Proyectos</span>
      </h1>

      <form className="my-10 bg-white shadow rounded-lg p-10">
        <div className="my-5">
          <label htmlFor="password" className="uppercase text-gray-700 block text-xl font-bold">Nuevo Password</label>
          <input 
            id="password"
            type="password"
            placeholder="Ingrese su nuevo password" 
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50" 
          />
        </div>

        <input 
          type="submit"
          value="Guarda Nuevo Password"
          className="bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
    </>
  )
}

export default NuevoPassword