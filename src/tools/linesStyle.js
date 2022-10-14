import { getPixels } from "./convertor"

export default function linesStyle(meme, width) {
    console.log(width)
    const textShadowSize = getPixels(meme.textShadowSize, width, 1000)
    return (
        {
            textTransform: meme.isUpperCase ? "uppercase" : "unset",
            fontSize: getPixels(meme.fontSize, width),
            color: meme.color,
            fontFamily: meme.fontFamily,
            textShadow: 
                `${textShadowSize}px ${textShadowSize}px 0 ${meme.textShadowColor},
                -${textShadowSize}px -${textShadowSize}px 0 ${meme.textShadowColor},
                ${textShadowSize}px -${textShadowSize}px 0 ${meme.textShadowColor},
                -${textShadowSize}px ${textShadowSize}px 0 ${meme.textShadowColor},
                0 ${textShadowSize}px 0 ${meme.textShadowColor},
                ${textShadowSize}px 0 0 ${meme.textShadowColor},
                0 -${textShadowSize}px 0 ${meme.textShadowColor},
                -${textShadowSize}px 0 0 ${meme.textShadowColor},
                ${textShadowSize}px ${textShadowSize}px 5px ${meme.textShadowColor}`,
            fontWeight: meme.fontWeight     
        }
    )
}