import React from 'react'
import ReactDOM from 'react-dom/client'
import './css/index.css'
import App from './App'
import { BrowserRouter } from "react-router-dom"
import { MemeContextProvider } from './context/MemeContext'
import { SavedContextProvider } from './context/SavedContext'


const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <React.StrictMode>
        <SavedContextProvider>
                <MemeContextProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
            </MemeContextProvider>
        </SavedContextProvider>
    </React.StrictMode>
)