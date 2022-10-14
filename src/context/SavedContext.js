import React, {useState} from "react"
// import { nanoid } from "nanoid"

const SavedContext = React.createContext()

function SavedContextProvider({children}) {
    const [savedMemes, setSavedMemes] = useState([])
    
    return (
        <SavedContext.Provider value={{
            savedMemes
        }}>
            {children}
        </SavedContext.Provider>
    )
}

export {SavedContextProvider, SavedContext}