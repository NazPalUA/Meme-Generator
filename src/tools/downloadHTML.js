import { toJpeg } from 'html-to-image'

export default function downloadHTML(id) {
    toJpeg(document.getElementById(id), { quality: 0.95 })
        .then(function (dataUrl) {
            const link = document.createElement('a')
            link.download = 'my-image-name.jpeg'
            link.href = dataUrl
            link.click()
            link.remove()
        })
}