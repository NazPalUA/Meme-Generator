import React, { useEffect, useState } from "react"
import useWindowSize from "../tools/useWindowSize"
import HorizontalScroll from 'react-horizontal-scrolling'

import ImagesSidebar from  "../components/ImagesSidebar"
import MainSection from "../components/MainSection"
import SettingsSidebar from "../components/SettingsSidebar"
import "../css/home.css"

export default function Home() {
    const size = useWindowSize()

    const [isThreeColumnLayout, setIsThreeColumnLayout] = useState(size.width >= 768)

    useEffect(()=>{
        setIsThreeColumnLayout(size.width >= 768)
    }, [size])



    return (
        <main className="home-page">
            <div className="container main__container" id="main__container">
                {!isThreeColumnLayout ? 
                    <HorizontalScroll className="section section_images-sidebar">
                        <ImagesSidebar />
                    </HorizontalScroll>
                :
                    <section className="section section_images-sidebar">
                        <ImagesSidebar />
                    </section>
                }
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
