import React, {useContext} from "react"
import {MemeContext} from "../context/MemeContext"

export default function Meme() {
    const {meme, linesArr} = useContext(MemeContext)
    return (
        <div className="meme" id="meme">
            <img 
                draggable="false" 
                onDragOver={event => {
                    event.preventDefault() 
                }}

                src={meme.img} 
                className="meme__image no-select" 
                alt="meme"/>
            {linesArr()}
        </div>
    )
}