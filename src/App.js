import React from "react"
import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import SavedMemes from "./pages/SavedMemes"

export default function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/saved" element={<SavedMemes />} />
            </Routes>
        </>
    )
}
