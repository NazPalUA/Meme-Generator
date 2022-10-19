import React, { useState } from "react"
import { nanoid } from "nanoid"

const ImagesContext = React.createContext()

function ImagesContextProvider({children}) {
    const [imagesArr, setImagesArr] = useState([])

    React.useEffect(() => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setImagesArr(data.data.memes)
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