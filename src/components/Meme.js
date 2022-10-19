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
        const memePosition = memeRef.current.getBoundingClientRect()
        const lineStartPosition = event.target.getBoundingClientRect()

        function deltaX() {
            const maxDeltaX = memePosition.right - lineStartPosition.right
            const minDeltaX = memePosition.left - lineStartPosition.left
            const dragDeltaX = event.clientX - dragStart.x

            if(dragDeltaX > maxDeltaX) return maxDeltaX
            else if(dragDeltaX < minDeltaX) return minDeltaX
            else return dragDeltaX
        }

        function deltaY() {
            const maxDeltaY = memePosition.bottom - lineStartPosition.bottom
            const minDeltaY = memePosition.top - lineStartPosition.top
            const dragDeltaY = event.clientY - dragStart.y
            if(dragDeltaY > maxDeltaY) return maxDeltaY
            else if(dragDeltaY < minDeltaY) return minDeltaY
            else return dragDeltaY
        }

        moveLine(event.target.id, getPercentages(deltaX(), size.width), 
            getPercentages(deltaY(), size.width))
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