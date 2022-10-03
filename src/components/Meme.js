import React, {useContext} from "react"
import {MemeContext} from "../context/MemeContext"

export default function Meme() {
    const {meme, linesArr} = useContext(MemeContext)
    return (
        <div className="meme" id="meme">
            <img src={meme.img} className="meme__image" alt="meme"/>
            {linesArr()}
        </div>
    )
}