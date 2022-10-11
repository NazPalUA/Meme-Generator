import React, {useState, useRef} from "react"
import { nanoid } from "nanoid"

const MemeContext = React.createContext()

function MemeContextProvider({children}) {
    const memeRef = useRef()

    const [dragStart, setDragStart] = useState({x: 0, y: 0})

    const [meme, setMeme] = useState({
        linesArr: [
            {
                text: "first line",
                active: false,
                top: 10,
                left: 25,
                lineId: "first"
            }
        ],
        lastActiveLineId: "first",
        img: "http://i.imgflip.com/1bij.jpg",
        isUpperCase: true,
        fontSize: 30,
        color: "#ffffff",
        fontFamily: "Calibri, Candara, sans-serif",
        fontWeight: "600",
        textShadowColor: "#000000",
        textShadowSize: 2
    })

    function handleSettingsChange(event) {
        const {name, value, type, checked} = event.target
        setMeme(prevMeme => {
            return {
                ...prevMeme,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    function centerText() {
        const lineWidth = document.getElementById(meme.lastActiveLineId).clientWidth
        const memeWidth = memeRef.current.clientWidth
        setMeme(prevMeme => ({
            ...prevMeme,
            linesArr: prevMeme.linesArr.map(line => {
                if(line.lineId !== meme.lastActiveLineId) return line
                else return {...line, 
                    left: (memeWidth-lineWidth)/2
                }
            })
        }))
    }

    function changeShadowSize(target) {
        setMeme(prevMeme => ({
            ...prevMeme,
            textShadowSize: target.value === "+" ? prevMeme.textShadowSize + 1 :
                target.value === "-" ? prevMeme.textShadowSize - 1 : 16
        }))
    }

    function changeTextSize(target) {
        setMeme(prevMeme => ({
            ...prevMeme,
            fontSize: target.value === "+" ? prevMeme.fontSize + 1 :
                target.value === "-" ? prevMeme.fontSize - 1 : 16
        }))
    }

    function toggleUpperCase() {
        setMeme(prevMeme => ({
            ...prevMeme,
            isUpperCase: !prevMeme.isUpperCase
        }))
    }

    function linesArr() {
        const style = {
            textTransform: meme.isUpperCase ? "uppercase" : "unset",
            fontSize: `${meme.fontSize}px`,
            color: meme.color,
            fontFamily: meme.fontFamily,
            textShadow: 
                `${meme.textShadowSize}px ${meme.textShadowSize}px 0 ${meme.textShadowColor},
                -${meme.textShadowSize}px -${meme.textShadowSize}px 0 ${meme.textShadowColor},
                ${meme.textShadowSize}px -${meme.textShadowSize}px 0 ${meme.textShadowColor},
                -${meme.textShadowSize}px ${meme.textShadowSize}px 0 ${meme.textShadowColor},
                0 ${meme.textShadowSize}px 0 ${meme.textShadowColor},
                ${meme.textShadowSize}px 0 0 ${meme.textShadowColor},
                0 -${meme.textShadowSize}px 0 ${meme.textShadowColor},
                -${meme.textShadowSize}px 0 0 ${meme.textShadowColor},
                ${meme.textShadowSize}px ${meme.textShadowSize}px 5px ${meme.textShadowColor}`,
            fontWeight: meme.fontWeight,
        }
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

    function handleDragStart(event) {
        event.target.classList.add("dragging")
        setDragStart({x: event.clientX, y: event.clientY})
    }

    function handleDragOver(event) {
        event.preventDefault()
    }

    function handleDragEnd(event) {
        event.target.classList.remove("dragging")
        const deltaX = event.clientX - dragStart.x
        const deltaY = event.clientY - dragStart.y

        setMeme(prevMeme => ({
            ...prevMeme,
            lastActiveLineId: event.target.id,
            linesArr: prevMeme.linesArr.map(line => {
                if(event.target.id !== line.lineId) return line
                else return {...line, 
                    top: line.top + deltaY,
                    left: line.left + deltaX
                }
            })
        }))
    }

    function handleDoubleInputClick(event, lineId) {
        setActive(lineId)
    }

    function handleInputChange(event) {
        const {id, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            linesArr: prevMeme.linesArr.map(line => {
                if(line.lineId !== id) return line
                else return {...line, 
                    text: value
                }
            })
        }))
    }
    
    function addLine() {
        const id = nanoid()
        setMeme(prevMeme => ({
            ...prevMeme,
            lastActiveLineId: id,
            linesArr: [...prevMeme.linesArr, {
                text: "new line",
                active: false,
                top: 300,
                left: 25,
                lineId: id
            }]
        }))
    }

    function setImg(url) {
        setMeme(prevMeme => ({
            ...prevMeme,
            img: url
        }))
    }

    function setActive(id) {
        setMeme(prevMeme => ({
            ...prevMeme,
            linesArr: prevMeme.linesArr.map(line => {
                if(line.lineId !== id) return {...line, active: false}
                else return {...line, active: !line.active}
            })
        }))
    }

    function removeActive(lastActiveLineId) {
        setMeme(prevMeme => ({
            ...prevMeme,
            linesArr: prevMeme.linesArr.map(line => {
                return {...line, active: false}
            }),
            lastActiveLineId: lastActiveLineId
        }))
    }
    
    return (
        <MemeContext.Provider value={{
            meme,
            memeRef,
            addLine,
            setImg,
            linesArr,
            toggleUpperCase,
            changeTextSize,
            changeShadowSize,
            handleSettingsChange,
            centerText
        }}>
            {children}
        </MemeContext.Provider>
    )
}

export {MemeContextProvider, MemeContext}