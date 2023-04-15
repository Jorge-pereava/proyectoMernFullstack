import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/Login';
import Registar from './pages/Registar';
import OlvidePassword from './pages/OlvidePassword';
import NuevoPassword from './pages/NuevoPassword';
import ConfirmarCuentas from './pages/ConfirmarCuentas';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AuthLayout/>}> 
            <Route index element={<Login/>} /> {/*Index porque va a ser el de la pagina inicial*/}
            <Route path='registrarse' element={<Registar/>} />
            <Route path='Olvide-Password' element={<OlvidePassword/>}/>
            <Route path='Olvide-Password/:token' element={<NuevoPassword/>}/>
            <Route path='Confirmar/:id' element={<ConfirmarCuentas/>}/>

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
