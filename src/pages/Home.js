import React, { useContext, useEffect, useState } from "react"
import useWindowSize from "../tools/useWindowSize"
import HorizontalScroll from 'react-horizontal-scrolling'
import { MemeContext } from "../context/MemeContext"
import ImagesSidebar from  "../components/ImagesSidebar"
import MainSection from "../components/MainSection"
import SettingsSidebar from "../components/SettingsSidebar"
import "../css/home.css"

export default function Home() {
    const {meme} = useContext(MemeContext)
    const size = useWindowSize()

    const [changeSizeTrigger, setChangeSizeTrigger] = useState(1)
    useEffect(() => {
        setTimeout(()=>setChangeSizeTrigger(2), 100)
    }, [])

    const [imagesSidebarStyle, setImagesSidebarStyle] = useState()

    const [isThreeColumnLayout, setIsThreeColumnLayout] = useState(size.width >= 768)

    useEffect(()=>{
        setIsThreeColumnLayout(size.width >= 768)
    }, [size])

    function getImagesSidebarStyle() {
        const viewportHeight = size.height ? size.height : window.innerHeight
        const headerHeight = document.getElementById("header").offsetHeight
        const mainHeight = document.getElementById("meme-container").offsetHeight

        if(isThreeColumnLayout) return {
            minHeight: viewportHeight-headerHeight,
            height: mainHeight
        }
    }

    useEffect(()=>{
        setImagesSidebarStyle(getImagesSidebarStyle)
    }, [meme.img, size, changeSizeTrigger])

    return (
        <main className="home-page">
            <div className="container main__container" id="main__container">
                {!isThreeColumnLayout ? 
                    <HorizontalScroll className="section section_images-sidebar" style={imagesSidebarStyle}>
                        <ImagesSidebar />
                    </HorizontalScroll>
                :
                    <section className="section section_images-sidebar" style={imagesSidebarStyle}>
                        <ImagesSidebar />
                    </section>
                }
                <section className="section section_main">
                    <MainSection />
                </section>
                <section className="section section_settings-sidebar"  style={imagesSidebarStyle}>
                    <SettingsSidebar />
                </section>
            </div>
        </main>
    )
}
