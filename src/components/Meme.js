import React, {useContext, useState} from "react"
import {MemeContext} from "../context/MemeContext"
import linesStyle from "../tools/linesStyle"

export default function Meme() {
    const {meme, memeRef, removeActive, handleInputChange, setActive, moveLine} = useContext(MemeContext)
    const [dragStart, setDragStart] = useState({x: 0, y: 0})

    function handleDragStart(event) {
        event.target.classList.add("dragging")
        setDragStart({x: event.clientX, y: event.clientY})
    }

    function handleDragOver(event) {
        event.preventDefault()
    }

    function handleDoubleInputClick(event, lineId) {
        setActive(lineId)
    }

    function handleDragEnd(event) {
        event.target.classList.remove("dragging")
        const deltaX = event.clientX - dragStart.x
        const deltaY = event.clientY - dragStart.y
        moveLine(event.target.id, deltaX, deltaY)
    }

    function linesArr() {
        const style = linesStyle(meme)
        return meme.linesArr.map(line => {
            const positionStyle = {
                top: `${line.top}px`,
                left: `${line.left}px`,
            }
            return line.active ?
            <input autoFocus
                key={line.lineId}
                id={line.lineId}
                type="text"
                placeholder="Type here"
                className={`meme__text active`}
                name="topText"
                value={line.text}
                onChange={handleInputChange}
                style={{...style, ...positionStyle}}
                onFocus={(event) => event.target.select()}
                onBlur={() => removeActive(line.lineId)}
                size={line.text.length}
            /> :
            <div
                draggable
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}

                key={line.lineId}
                id={line.lineId}
                className={`meme__text no-select`}
                onDoubleClick={(event) => handleDoubleInputClick(event, line.lineId)}
                style={{...style, ...positionStyle}}
            >
                {line.text}
            </div>
        })
    }

    return (
        <div className="meme" id="meme" ref={memeRef}>
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