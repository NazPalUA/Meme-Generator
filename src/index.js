import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import { MemeContextProvider } from './context/MemeContext'
import { SavedContextProvider } from './context/SavedContext'
import { ImagesContextProvider } from './context/ImagesContext'
import App from './App'
import './index.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <React.StrictMode>
        <ImagesContextProvider>
            <SavedContextProvider>
                    <MemeContextProvider>
                        <BrowserRouter>
                            <App />
                        </BrowserRouter>
                </MemeContextProvider>
            </SavedContextProvider>
        </ImagesContextProvider>
    </React.StrictMode>
)