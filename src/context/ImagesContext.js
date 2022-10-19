import React, { useState } from "react"
import { nanoid } from "nanoid"

const ImagesContext = React.createContext()

function ImagesContextProvider({children}) {
    const [imagesArr, setImagesArr] = useState([])

    React.useEffect(() => {
        localStorage.setItem('imagesArr', JSON.stringify(imagesArr))
    }, [imagesArr]) 
    
    const imgFromLocalStorage = JSON.parse(localStorage.getItem('imagesArr'))
    React.useEffect(() => {
        if(imgFromLocalStorage) setImagesArr(imgFromLocalStorage)

        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()

            const newImgs = data.data.memes

            setImagesArr(prev => {
                const urls = new Set(prev.map(img => img.url))
                return [...prev, ...newImgs.filter(img => !urls.has(img.url))]
            })
        }
        
        getMemes()
    }, []) 

    function addToImagesArr(url) {
        const hasImg = imagesArr.some( img => img.url === url )
        if(!hasImg) {
            setImagesArr(prev => {
                return [
                    {id: nanoid(), url},
                    ...prev
                ]
            })
        }
    }
    
    return (
        <ImagesContext.Provider value={{
            imagesArr,
            addToImagesArr,
        }}>
            {children}
        </ImagesContext.Provider>
    )
}

export {ImagesContextProvider, ImagesContext}