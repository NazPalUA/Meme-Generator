import React from "react"
import Header from "./components/Header"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import MyMemes from "./pages/SavedMemes"

export default function App() {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/saved" element={<MyMemes />} />
            </Routes>
        </div>
    )
}
