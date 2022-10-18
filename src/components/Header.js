import React from "react"
import { Link } from "react-router-dom"
import '../css/header.css'
import trollFace from "../images/header-logo.png"
import bookmark from "../images/bookmark.png"

export default function Header() {
    return (
        <header className="header">
            <Link to="/" className="header__logo-link">
                <img 
                    src={trollFace} 
                    className="header__logo"
                    alt="troll face"
                />      
                <h2 className="header__title">Meme Generator</h2>
            </Link>
            <Link to="/saved" className="header__saved-link">
                <span className="header__saved-num">0</span>
                <img 
                    src={bookmark} 
                    className="header__saved-img"
                    alt="bookmark pic"
                />   
            </Link>
        </header>
    )
}