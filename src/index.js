import React from 'react'
import ReactDOM from 'react-dom/client'
import './css/index.css'
import App from './App'
import { BrowserRouter } from "react-router-dom"
import { MemeContextProvider } from './context/MemeContext'


const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <MemeContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MemeContextProvider>
  </React.StrictMode>
)