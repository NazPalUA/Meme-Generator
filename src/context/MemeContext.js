import React, {useState} from "react"
import { nanoid } from "nanoid"

const MemeContext = React.createContext()

function MemeContextProvider({children}) {
    const [dragStart, setDragStart] = useState({x: 0, y: 0})

    const [meme, setMeme] = useState({
        linesArr: [
            {
                text: "first line",
                active: false,
                top: 10,
                left: 25,
                lineId: nanoid()
            }
        ],
        img: "http://i.imgflip.com/1bij.jpg",
        isUpperCase: false,
        fontSize: 16,
        color: "white",
        fontFamily: "Arial",
        fontWeight: "bold",
        textShadowColor: "black",
        textShadowBlurRadius: 2
    })

    function linesArr() {
        return meme.linesArr.map(line => {
            const style = {
                top: `${line.top}px`,
                left: `${line.left}px`,
            }
            return line.active ?
            <input autoFocus
                key={line.lineId}
                id={line.lineId}
                type="text"
                placeholder="Type here"
                className={"meme__text active"}
                name="topText"
                value={line.text}
                onChange={handleInputChange}
                style={style}
                onFocus={(event) => event.target.select()}
                onBlur={() => removeActive()}
            /> :
            <div
                draggable
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}

                key={line.lineId}
                id={line.lineId}
                className={"meme__text no-select"}
                onDoubleClick={(event) => handleDoubleInputClick(event, line.lineId)}
                style={style}
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
        setMeme(prevMeme => ({
            ...prevMeme,
            linesArr: [...prevMeme.linesArr, {
                text: "new line",
                active: false,
                top: 300,
                left: 25,
                lineId: nanoid()
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

    function removeActive() {
        setMeme(prevMeme => ({
            ...prevMeme,
            linesArr: prevMeme.linesArr.map(line => {
                return {...line, active: false}
            })
        }))
    }
    
    return (
        <MemeContext.Provider value={{
            meme,
            addLine,
            setImg,
            linesArr
        }}>
            {children}
        </MemeContext.Provider>
    )
}

export {MemeContextProvider, MemeContext}