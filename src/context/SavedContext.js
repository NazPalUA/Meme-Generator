import React, {useState} from "react"
// import { nanoid } from "nanoid"

const SavedContext = React.createContext()

function SavedContextProvider({children}) {
    const [savedMemes, setSavedMemes] = useState( () => {
        const storageData = localStorage.getItem("saved")
        return storageData ? JSON.parse(storageData) : []
    })

    function addToSaved(meme) {
        setSavedMemes(prev => [meme, ...prev])
    }

    console.log(savedMemes)
    
    return (
        <SavedContext.Provider value={{
            savedMemes,
            addToSaved
        }}>
            {children}
        </SavedContext.Provider>
    )
}

export {SavedContextProvider, SavedContext}