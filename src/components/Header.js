import React from "react"
import trollFace from "../images/header-logo.png"
import '../css/header.css'
import {Link} from "react-router-dom"

export default function Header() {
    return (
        <header className="header">
            <Link to="/" className="header__image-link">
                <img 
                    src={trollFace} 
                    className="header__image"
                    alt="troll face"
                />      
                <h2 className="header__title">Meme Generator</h2>
            </Link>
            <Link to="/saved" className="header__project-link">
                <h4 className="header__project">React Course - Project 3</h4>
            </Link>
        </header>
    )
}