import React from "react"
import { Link } from "react-router-dom"
import './Header.css'
import trollFace from "../images/header-logo.png"
import bookmark from "../images/bookmark.png"

export default function Header() {
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