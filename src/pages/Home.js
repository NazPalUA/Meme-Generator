import React, { useContext, useEffect, useState } from "react"
import { MemeContext } from "../context/MemeContext"
import ImagesSidebar from  "../components/ImagesSidebar"
import MainSection from "../components/MainSection"
import SettingsSidebar from "../components/SettingsSidebar"
import "../css/home.css"

export default function Home() {
    const {meme} = useContext(MemeContext)

    const [imagesSidebarStyle, setImagesSidebarStyle] = useState()

    function updateImagesSidebarStyle() {
        const viewportHeight = window.innerHeight
        const headerHeight = document.getElementById("header").offsetHeight
        const mainHeight = document.getElementById("meme-container").offsetHeight

        const style = {
            minHeight: viewportHeight-headerHeight,
            height: mainHeight
        }

        setImagesSidebarStyle(style)
    }

    useEffect(()=>{
        updateImagesSidebarStyle()
    }, [meme.img])

    return (
        <main className="home-page">
            <div className="container main__container">
                <section className="section section_images-sidebar" style={imagesSidebarStyle}>
                    <ImagesSidebar />
                </section>
                <section className="section section_main">
                    <MainSection />
                </section>
                <section className="section section_settings-sidebar">
                    <SettingsSidebar />
                </section>
            </div>
        </main>
    )
}
