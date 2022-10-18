import React from "react"
import AllMemes from  "../components/ImagesSidebar"
import MemeContainer from "../components/MainSection"
import Settings from "../components/SettingsSidebar"
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
