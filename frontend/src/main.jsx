import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import CriarEmpresa from './routes/CreateEmpresa.jsx'
import Menu from './routes/Menu.jsx'
import CriarSetor from './routes/CreateSetor.jsx'
import Relatorio from './routes/Relatorio.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Menu/>
      },
      {
        path: "/criar-empresa",
        element: <CriarEmpresa/>
      },
      {
        path: "/criar-setor",
        element: <CriarSetor/>
      },
      {
        path: "/relatorio",
        element: <Relatorio/>
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider  router={router}/>
  </React.StrictMode>,
)
