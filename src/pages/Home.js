import React from "react"
import ImagesSidebar from  "../components/ImagesSidebar"
import MainSection from "../components/MainSection"
import SettingsSidebar from "../components/SettingsSidebar"
import "./Home.scss"

export default function Home() {
    return (
        <main className="home-page">
            <div className="container home-page__container">
                <section className="home-page__section home-page__section_images-sidebar">
                    <ImagesSidebar />
                </section>
                <section className="home-page__section home-page__section_main">
                    <MainSection />
                </section>
                <section className="home-page__section home-page__section_settings-sidebar">
                    <SettingsSidebar />
                </section>
            </div>
        </main>
    )
}
