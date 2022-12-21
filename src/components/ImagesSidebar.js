import React, { useContext, useEffect, useState } from "react"
import { ScrollMenu } from 'react-horizontal-scrolling-menu'
import useWindowSize from "../tools/useWindowSize"
import { ImagesContext } from "../context/ImagesContext"
import { MemeContext } from "../context/MemeContext"
import "../css/images-sidebar.css"
import deleteIcon from "../images/delete.png"

export default function ImagesSidebar() {

    const size = useWindowSize()

    const [isThreeColumnLayout, setIsThreeColumnLayout] = useState(size.width >= 1025)

    useEffect(()=>{
        setIsThreeColumnLayout(size.width >= 1025)
    }, [size])


    const {setImg} = useContext(MemeContext)
    const {imagesArr, removeFromImagesArr} = useContext(ImagesContext)
    const memeList = imagesArr.map(meme => {
        return (
            <div
                className="meme-list__item"
                key={meme.id}
            >
                <img 
                    className="meme-list__img"
                    src={meme.url}
                    alt={meme.name && "meme image"}
                    id={meme.id}
                    onClick={e => setImg(e.target.src, meme.name)}
                />

                <img 
                    className={`meme-list__delete-img no-select`}
                    src={deleteIcon} 
                    alt="delete icon"
                    onClick={() => removeFromImagesArr(meme.id)}
                />
            </div>
        )
    })
    return (
        <>
            {isThreeColumnLayout ? 
                <div className="meme-list">
                    {memeList}
                </div>
            :
                <ScrollMenu className="meme-list">
                        {memeList}
                </ScrollMenu>
            }
        </>

    )
}