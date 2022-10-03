import React from "react"
import MemeContainer from "../components/MemeContainer"
import Settings from "../components/Settings"
import "../css/home.css"

export default function Home() {
    return (
        <div className="home-page">
            <MemeContainer />
            <Settings />
        </div>
    )
}
