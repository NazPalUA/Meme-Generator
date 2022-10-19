import React, { useContext, useState, useLayoutEffect, useEffect } from "react"
import { MemeContext } from "../context/MemeContext"
import { getPixels, getPercentages } from "../tools/unitsConverter"
import linesStyle from "../tools/linesStyle"

export default function Meme() {
    const {
        meme, 
        memeRef, 
        removeActive, 
        handleInputChange, 
        setActive, 
        moveLine,
        lastActiveLineRef
    } = useContext(MemeContext)

    const [dragStart, setDragStart] = useState({x: 0, y: 0})

    const [size, setSize] = useState({width: 0, height: 0})

    function updateSize() {
        setSize({
                width: memeRef.current.clientWidth, 
                height: memeRef.current.clientHeight
        })
    }
    
    // update size on first load
    useEffect(updateSize, [memeRef.current])

    useLayoutEffect(() => {
        window.addEventListener('resize', updateSize)
        updateSize()
        return () => window.removeEventListener('resize', updateSize)
    }, [])


    function handleDragStart(event) {
        event.target.classList.add("dragging")
        setDragStart({x: event.clientX, y: event.clientY})
    }

    function handleDragOver(event) {
        event.preventDefault()
    }

    function handleDoubleInputClick(lineId) {
        setActive(lineId)
    }

    function handleDragEnd(event) {
        event.target.classList.remove("dragging")
        const deltaX = event.clientX - dragStart.x
        const deltaY = event.clientY - dragStart.y
        moveLine(event.target.id, getPercentages(deltaX, size.width), getPercentages(deltaY, size.width))
    }

    function linesArr() {
        const style = linesStyle(meme, size.width)
        return meme.linesArr.map(line => {
            const positionStyle = {
                top: getPixels(line.top, size.width)+"px",
                left: getPixels(line.left, size.width)+"px",
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
                onDoubleClick={() => handleDoubleInputClick(line.lineId)}
                style={{...style, ...positionStyle}}
                ref={line.lineId === meme.lastActiveLineId ?
                        lastActiveLineRef : null}
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