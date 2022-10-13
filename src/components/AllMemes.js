import React, {useContext} from "react"
import {MemeContext} from "../context/MemeContext"
import "../css/all-memes.css"

export default function AllMemes() {
    const {allMemes, setImg} = useContext(MemeContext)
    const memeList = allMemes.map(meme => {
        return <img 
            className="meme-list__item"
            key={meme.id}
            src={meme.url}
            alt={meme.name && "meme image"}
            onClick={e => setImg(e.target.src, meme.name)}
        />
    })
    return (
        <div className="meme-list">
                {memeList}
        </div>
    )
}