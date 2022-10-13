import { toJpeg } from 'html-to-image'
// import {MemeContext} from "../context/MemeContext"
// import {useContext} from "react"

export default function downloadHTML(id) {
    // const {meme} = useContext(MemeContext)
    toJpeg(document.getElementById(id), { quality: 0.95 })
        .then(function (dataUrl) {
            const link = document.createElement('a')
            link.download = 'my-image-name.jpeg'
            link.href = dataUrl
            link.click()
            link.remove()
        })
}