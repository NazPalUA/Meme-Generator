import React, {useState} from "react"
import { nanoid } from "nanoid"

const MemeContext = React.createContext()

function MemeContextProvider({children}) {

    const [meme, setMeme] = useState({
        linesArr: [
            {
                text: "first line",
                active: false,
                top: 10,
                left: 25,
                lineId: nanoid()
            },
            {
                text: "second line",
                active: false,
                top: 100,
                left: 25,
                lineId: nanoid()
            },
            {
                text: "third line",
                active: false,
                top: 200,
                left: 25,
                lineId: nanoid()
            }
        ],
        img: "http://i.imgflip.com/1bij.jpg" 
    })


    function linesArr() {
        return meme.linesArr.map(line => {
            const style = {
                top: `${line.top}px`,
                left: `${line.left}px`,
            }
            return <input 
                key={line.lineId}
                type="text"
                placeholder="Type here"
                className={line.active ? "meme__text active" : "meme__text"}
                name="topText"
                value={line.text}
                onChange={handleInputChange}
                onClick={() => setActive(line.lineId)}
                style={style}
            />
        })
    }

    function handleInputChange() {
        return (true)
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

    function moveLine(direction) {
        const leftMove = direction === "right" ? 10 : direction === "left" ? -10 : 0
        const topMove = direction === "top" ? -10 : direction === "bottom" ? 10 : 0
        
        setMeme(prevMeme => ({
            ...prevMeme,
            linesArr: prevMeme.linesArr.map(line => {
                if(!line.active) return line
                else return {...line, 
                    top: line.top + topMove,
                    left: line.left + leftMove
                }
            })
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
    
    return (
        <MemeContext.Provider value={{
            meme,
            addLine,
            setImg,
            linesArr,
            moveLine
        }}>
            {children}
        </MemeContext.Provider>
    )
}

export {MemeContextProvider, MemeContext}