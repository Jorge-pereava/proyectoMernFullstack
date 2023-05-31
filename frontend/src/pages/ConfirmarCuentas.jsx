import { useEffect, useState} from "react";
import {useParams, Link} from 'react-router-dom';
import axios from "axios";
import Alerta from "../components/Alerta";


const ConfirmarCuentas = () => {

  const [alerta, setAlerta] = useState({});
  const[cuentaConfirmada, setCuentaConfirmada] = useState(false)

  const params = useParams();
  //console.log(params) 
  const {id} =params;


  useEffect(() => {
    const confirmarCuenta = async()=>{
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/users/confirmar/${id}`;
        const {data} = await axios.get(url);
        console.log(data)
        setAlerta({
          msg: data.msg,
          error: false
        })

        setCuentaConfirmada(true);

      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    confirmarCuenta();
  }, [])

  const {msg} = alerta


  return (
    <>
      <h1 className="text-sky-600 font-bold text-6xl capitalize">
        Confirma tu cuenta y crea tus {' '}
        <span className="text-slate-700 ">Proyectos</span>
      </h1>

      <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && < Alerta alerta={alerta} />}


        {/* Si la cuenta está confirmada retorna el iniciar sesión para poder ir a esa ruta */}
        {cuentaConfirmada && (
          <Link 
          to="/"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          >
            Inicia Sesión

          </Link>
        )}
      </div> 
    </>
  )
}

export default ConfirmarCuentas