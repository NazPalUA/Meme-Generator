import React, {useContext} from "react"
import downloadHTML from "../tools/downloadHTML"
import Meme from "./Meme"
import '../css/meme-container.css'
import {MemeContext} from "../context/MemeContext"
import {SavedContext} from "../context/SavedContext"
import { nanoid } from "nanoid"

export default function MemeContainer() {
    const {meme, setImg, allMemes, addToAllMemes} = useContext(MemeContext)
    const {addToSaved} = useContext(SavedContext)
    
    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        const name = allMemes[randomNumber].name
        setImg(url, name)
    }

    function uploadImage(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            const id = nanoid()
            // convert file to base64 String
            const base64String = reader.result.replace('data:', '').replace(/^.+,/, '')
            // store file
            // localStorage.setItem('wallpaper', base64String)
            // display image
            const imgUrl = `data:image/png;base64,${base64String}`
            // console.log(imgUrl)
            setImg(imgUrl, "name")
            addToAllMemes(id, imgUrl)
        }
        reader.readAsDataURL(file)

    }

    return (
        <div className="meme-container">
            <input 
                type='file' 
                id="uploadBannerImage" 
                name="uploadBannerImage"
                onChange={uploadImage}
                style={{display: "none"}} 
            />
            <button 
                className="meme__button meme__button_1"
                onClick={()=>document.getElementById("uploadBannerImage").click()}
            >
                Upload
            </button>

            <button 
                className="meme__button meme__button_2"
                onClick={getMemeImage}
            >
                Get a new meme image 🖼
            </button>

            <Meme />

            <button 
                    className="meme__button meme__button_3"
                    onClick={()=>downloadHTML("meme")}
                >
                    Download
            </button>

            <button 
                className="meme__button meme__button_4"
                onClick={() => addToSaved(meme)}
            >
                Save
            </button>

        </div>
    )
}