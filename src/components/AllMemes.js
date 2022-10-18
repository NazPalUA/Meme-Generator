import React, {useContext} from "react"
import {MemeContext} from "../context/MemeContext"
import { ImagesContext } from "../context/ImagesContext"
import "../css/all-memes.css"

export default function AllMemes() {
    const {setImg} = useContext(MemeContext)
    const {imagesArr} = useContext(ImagesContext)
    const memeList = imagesArr.map(meme => {
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