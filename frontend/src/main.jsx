import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  
  //Comenté la linea anterior porque el React.StrictMode, estaba haciendo que se me renderizara la pagina 2 veces

  <App />,
)
