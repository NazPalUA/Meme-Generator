import React, { useContext, useRef } from "react"
import { MemeContext } from "../context/MemeContext"
import { SavedContext } from "../context/SavedContext"
import { ImagesContext } from "../context/ImagesContext"
import Meme from "./Meme"
import downloadHTML from "../tools/downloadHTML"
import '../css/main-section.css'

export default function MainSection() {
    const {meme, setImg} = useContext(MemeContext)
    const {imagesArr, addToImagesArr} = useContext(ImagesContext)
    const {addToSaved} = useContext(SavedContext)
    
    function getNextImage() {
        const currentIndex = imagesArr.findIndex(img => {
            return img.url === meme.img
        })
        const nextIndex = currentIndex === imagesArr.length-1 ? 0 : currentIndex+1
        const url = imagesArr[nextIndex].url
        const name = imagesArr[nextIndex].name
        setImg(url, name)
    }

    function uploadImage(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result.replace('data:', '').replace(/^.+,/, '')
            const imgUrl = `data:image/png;base64,${base64String}`
            addToImagesArr(imgUrl)
            setImg(imgUrl)
        }
        reader.readAsDataURL(file)
    }

    const inputRef = useRef(null)

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
                onClick={getNextImage}
            >
                Next image
            </button>

            <form className="meme__url-form">
                <input 
                    className="meme__url-input"
                    type="text"
                    placeholder="past image link"
                    ref={inputRef}
                />
                <button 
                    className="meme__button meme__button_url"
                    onClick={(e) => {
                        e.preventDefault()
                        setImg(inputRef.current.value)
                        addToImagesArr(inputRef.current.value)
                        inputRef.current.value=""
                    }}
                >
                    Get Image
                </button>
            </form>

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