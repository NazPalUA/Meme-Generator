import React, { useEffect, useState } from "react"
import ImagesSidebar from  "../components/ImagesSidebar"
import MainSection from "../components/MainSection"
import SettingsSidebar from "../components/SettingsSidebar"
import "../css/home.css"

export default function Home() {
    return (
        <main className="home-page">
            <div className="container main__container" id="main__container">
                <section className="section section_images-sidebar">
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
