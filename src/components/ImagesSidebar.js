import React, { useContext } from "react"
import { ImagesContext } from "../context/ImagesContext"
import { MemeContext } from "../context/MemeContext"
import "../css/images-sidebar.css"

export default function ImagesSidebar() {
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