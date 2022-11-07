import React from "react"
import { Link, useLocation } from "react-router-dom"
import '../css/header.css'
import trollFace from "../images/header-logo.png"
import bookmark from "../images/bookmark.png"
import settings from "../images/settings.svg"

export default function Header() {
    const location = useLocation()

    function showSettings() {
        document.getElementById("main__container")
            .classList.toggle("active_settings")
    }
    return (
        <header className="header" id="header">
            <div className="container header__container">
                <Link to="/" className="header__main-link">
                    <img 
                        src={trollFace} 
                        className="header__logo"
                        alt="troll face"
                    />      
                    <h1 className="header__title">Meme Generator</h1>
                </Link>
                {location.pathname === "/" && 
                    <img 
                        src={settings} 
                        className="settings-icon"
                        alt="settings pic"
                        onClick={showSettings}
                    />
                }
                <Link to="/saved" className="header__saved-link">
                    <span className="header__saved-num">0</span>
                    <img 
                        src={bookmark} 
                        className="header__saved-img"
                        alt="bookmark pic"
                    />   
                </Link>
            </div>
        </header>
    )
}