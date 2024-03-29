import React, { useContext, useRef, useCallback } from "react"
import { toPng } from 'html-to-image';
import { MemeContext } from "../context/MemeContext"
import { SavedContext } from "../context/SavedContext"
import { ImagesContext } from "../context/ImagesContext"
import Meme from "./Meme"
import './MainSection.scss'

export default function MainSection() {
    const {meme, setImg, memeRef} = useContext(MemeContext)
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

    const onDownloadClick = useCallback(() => {
        if (memeRef.current === null) {
            return
        }
        toPng(memeRef.current, { cacheBust: true, })
            .then((dataUrl) => {
                const link = document.createElement('a')
                link.download = 'my-image-name.png'
                link.href = dataUrl
                link.click()
                link.remove()
            })
            .catch((err) => {
                console.log(err)
            })
    }, [memeRef])

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
        <div className="main-sec">
            <input 
                type='file' 
                id="uploadBannerImage" 
                name="uploadBannerImage"
                onChange={uploadImage}
                style={{display: "none"}} 
            />
            <button 
                className="main-sec__btn main-sec__btn_1"
                onClick={()=>document.getElementById("uploadBannerImage").click()}
            >
                Upload
            </button>

            <button 
                className="main-sec__btn main-sec__btn_2"
                onClick={getNextImage}
            >
                Next image
            </button>

            <form className="main-sec__url-form">
                <input 
                    className="main-sec__url-input"
                    type="text"
                    placeholder="past image link"
                    ref={inputRef}
                />
                <button 
                    className="main-sec__btn main-sec__btn_url"
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
                    className="main-sec__btn main-sec__btn_3"
                    onClick={onDownloadClick}
                >
                    Download
            </button>

            <button 
                className="main-sec__btn main-sec__btn_4"
                onClick={() => addToSaved(meme)}
            >
                Save
            </button>

        </div>
    )
}