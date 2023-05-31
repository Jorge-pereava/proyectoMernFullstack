import { useState, useEffect} from "react";
import { useParams, Link} from "react-router-dom";
import axios from "axios";
import Alerta from "../components/Alerta";

const NuevoPassword = () => {

  const[alerta, setAlerta] = useState({});
  const[tokenValido, setTokenValido] = useState(false);
  const [password, setNuevoPassword] = useState('');


  useEffect(()=>{
    const comprobarToken = async ()=>{
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/users/olvide-password/${token}`
        const {data} = await axios.get(url)

        setAlerta({
          msg: data.msg,
          error:false
        })

        setTokenValido(true)

      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        });
      }
    }
    
    comprobarToken()

  },[])

  const{msg} = alerta
  

  const params = useParams()
  //console.log(params)
  const {token} = params;

  const handleSubmit = async (e)=>{
    e.preventDefault();
    
      if(password == ''){
        setAlerta({
          msg: 'El password es requerido, no puede ser vacio',
          error: true
        });
        return
      }
      if(password.length <6){
        setAlerta({
          msg: 'Ingrese un password mayor a 6 digitos',
          error: true
        });
        return
      }
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/users/olvide-password/${token}`;
        const {data} = await axios.post(url, {password} );

        setAlerta({
          msg: data.msg,
          error: false
        });

      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }

      setNuevoPassword('')
  } 

  
  return (
    <>
      <h1 className="text-sky-600 font-bold text-6xl capitalize">
        Reestablece tu password y ten acceso a tus {' '}
        <span className="text-slate-700 ">Proyectos</span>
      </h1>

      {msg && <Alerta alerta={alerta}/>}

      {/* Si el token es valido mostrar el */}
      {(tokenValido &&
        <form
              className="my-10 bg-white shadow rounded-lg p-10"
              onSubmit={handleSubmit} 
              >
          <div className="my-5">
            <label htmlFor="password" className="uppercase text-gray-700 block text-xl font-bold">Nuevo Password</label>
            <input 
              id="password"
              type="password"
              placeholder="Ingrese su nuevo password" 
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={password}
              onChange={e => setNuevoPassword(e.target.value)} 
            />
          </div>

          <input 
            type="submit"
            value="Guarda Nuevo Password"
            className="bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />
        </form>
      )}

        <Link 
        to="/"
        className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          Inicia Sesión

        </Link>
    </>
  )
}

export default NuevoPassword