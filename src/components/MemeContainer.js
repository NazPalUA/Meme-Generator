import React, {useContext} from "react"
import downloadHTML from "../tools/downloadHTML"
import Meme from "./Meme"
import '../css/meme-container.css'
import {MemeContext} from "../context/MemeContext"

export default function MemeContainer() {
    const {setImg, allMemes} = useContext(MemeContext)
    
    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        const name = allMemes[randomNumber].name
        setImg(url, name)
    }

    return (
        <div className="meme-container">

            <button 
                className="meme__button meme__button_1"
            >
                Upload
            </button>

            <button 
                className="meme__button meme__button_2"
                onClick={getMemeImage}
            >
                Get a new meme image 🖼
            </button>

            <Meme />

            <button 
                    className="meme__button meme__button_3"
                    onClick={()=>downloadHTML("meme")}
                >
                    Download
            </button>

            <button 
                className="meme__button meme__button_4"
            >
                Save
            </button>

        </div>
    )
}