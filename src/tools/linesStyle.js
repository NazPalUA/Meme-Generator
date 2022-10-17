import { getPixels } from "./convertor"

export default function linesStyle(meme, width) {
    console.log(width)
    const fontSize = getPixels(meme.fontSize, width)
    const textShadowSize = fontSize * meme.textShadowSize /100
    return (
        {
            textTransform: meme.isUpperCase ? "uppercase" : "unset",
            fontSize: getPixels(meme.fontSize, width),
            color: meme.color,
            fontFamily: meme.fontFamily,
            fontWeight: meme.fontWeight,
            textShadow: 
                `${textShadowSize}px ${textShadowSize}px 0 ${meme.textShadowColor},
                -${textShadowSize}px -${textShadowSize}px 0 ${meme.textShadowColor},
                ${textShadowSize}px -${textShadowSize}px 0 ${meme.textShadowColor},
                -${textShadowSize}px ${textShadowSize}px 0 ${meme.textShadowColor},
                0 ${textShadowSize}px 0 ${meme.textShadowColor},
                ${textShadowSize}px 0 0 ${meme.textShadowColor},
                0 -${textShadowSize}px 0 ${meme.textShadowColor},
                -${textShadowSize}px 0 0 ${meme.textShadowColor},
                ${textShadowSize}px ${textShadowSize}px 0px ${meme.textShadowColor}`,    
        }
    )
}