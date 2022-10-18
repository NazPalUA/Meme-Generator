import React from "react"
import ImagesSidebar from  "../components/ImagesSidebar"
import MainSection from "../components/MainSection"
import SettingsSidebar from "../components/SettingsSidebar"
import "../css/home.css"

export default function Home() {
    return (
        <div className="home-page">
            <ImagesSidebar />
            <MainSection />
            <SettingsSidebar />
        </div>
    )
}
