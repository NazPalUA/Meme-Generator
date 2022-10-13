import React from "react"
import AllMemes from  "../components/AllMemes"
import MemeContainer from "../components/MemeContainer"
import Settings from "../components/Settings"
import "../css/home.css"

export default function Home() {
    return (
        <div className="home-page">
            <AllMemes />
            <MemeContainer />
            <Settings />
        </div>
    )
}
