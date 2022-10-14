import React, {useContext} from "react"
import {SavedContext} from "../context/SavedContext"
import { nanoid } from "nanoid"
import linesStyle from "../tools/linesStyle"

export default function MyMemes() {
    const {savedMemes} = useContext(SavedContext)
    function linesArr(meme) {
        const style = linesStyle(meme)
        return meme.linesArr.map(line => {
            const positionStyle = {
                top: `${line.top}px`,
                left: `${line.left}px`,
            }
            return (
                <div
                    key={line.lineId}
                    id={line.lineId}
                    className={`meme__text no-select`}
                    style={{...style, ...positionStyle}}
                >
                    {line.text}
                </div>
            )
        })
    }

    function memesArr() {
        return savedMemes.map(meme => {
            return (
                <div className="meme" key={nanoid()}>
                    <img 
                        src={meme.img} 
                        className="meme__image no-select" 
                        alt="meme"
                    />
                    {linesArr(meme)}
                </div>
            )
        })
    }

    return (
        <div>
            {memesArr()}
        </div>
    )
}
