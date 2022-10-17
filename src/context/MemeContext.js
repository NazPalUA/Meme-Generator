import React, {useState, useRef} from "react"
import { nanoid } from "nanoid"
import {getPercentage} from "../tools/convertor"

const MemeContext = React.createContext()

function MemeContextProvider({children}) {
    const memeRef = useRef()



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
        name: "",
        isUpperCase: true,
        fontSize: 12,
        color: "#ffffff",
        fontFamily: "Calibri, Candara, sans-serif",
        fontWeight: "600",
        textShadowColor: "#000000",
        textShadowSize: 3, //percentage from fontSize (0 - 6)
    })

    const [allMemes, setAllMemes] = React.useState([])
    
    React.useEffect(() => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemes(data.data.memes)
        }
        getMemes()
    }, []) 

    function addToAllMemes(id , url) {
        setAllMemes(prev => {
            return [
                {id, url},
                ...prev
            ]
        })
    }

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
                    left: getPercentage((memeWidth-lineWidth)/2, memeWidth)
                }
            })
        }))
    }

    function changeShadowSize(target) {
        setMeme(prevMeme => ({
            ...prevMeme,
            textShadowSize: target.value === "+" && prevMeme.textShadowSize < 6 ? 
                prevMeme.textShadowSize + 1 :
                target.value === "-" && prevMeme.textShadowSize > 0 ? 
                prevMeme.textShadowSize - 1 : prevMeme.textShadowSize
        }))
    }

    function changeTextSize(target) {
        setMeme(prevMeme => ({
            ...prevMeme,
            fontSize: target.value === "+" ? prevMeme.fontSize + 1 :
                target.value === "-" ? prevMeme.fontSize - 1 : 12
        }))
    }

    function toggleUpperCase() {
        setMeme(prevMeme => ({
            ...prevMeme,
            isUpperCase: !prevMeme.isUpperCase
        }))
    }


    function moveLine(activeLineId, deltaX, deltaY) {
        setMeme(prevMeme => ({
            ...prevMeme,
            lastActiveLineId: activeLineId,
            linesArr: prevMeme.linesArr.map(line => {
                if(activeLineId !== line.lineId) return line
                else return {...line, 
                    top: line.top + deltaY,
                    left: line.left + deltaX
                }
            })
        }))
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

    function setImg(url, name) {
        setMeme(prevMeme => ({
            ...prevMeme,
            img: url,
            name: name
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
            allMemes,
            addLine,
            setImg,
            toggleUpperCase,
            changeTextSize,
            changeShadowSize,
            handleSettingsChange,
            centerText,
            addToAllMemes,
            removeActive,
            handleInputChange,
            setActive,
            moveLine
        }}>
            {children}
        </MemeContext.Provider>
    )
}

export {MemeContextProvider, MemeContext}