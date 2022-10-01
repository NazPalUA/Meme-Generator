import React from "react"
import Meme from "../components/Meme"
import Settings from "../components/Settings"
import "./home.css"

export default function Home() {
    return (
        <div className="home-page">
            <Meme />
            <Settings />
        </div>
    )
}
