export default function linesStyle(meme) {
    return (
        {
            textTransform: meme.isUpperCase ? "uppercase" : "unset",
            fontSize: `${meme.fontSize}px`,
            color: meme.color,
            fontFamily: meme.fontFamily,
            textShadow: 
                `${meme.textShadowSize}px ${meme.textShadowSize}px 0 ${meme.textShadowColor},
                -${meme.textShadowSize}px -${meme.textShadowSize}px 0 ${meme.textShadowColor},
                ${meme.textShadowSize}px -${meme.textShadowSize}px 0 ${meme.textShadowColor},
                -${meme.textShadowSize}px ${meme.textShadowSize}px 0 ${meme.textShadowColor},
                0 ${meme.textShadowSize}px 0 ${meme.textShadowColor},
                ${meme.textShadowSize}px 0 0 ${meme.textShadowColor},
                0 -${meme.textShadowSize}px 0 ${meme.textShadowColor},
                -${meme.textShadowSize}px 0 0 ${meme.textShadowColor},
                ${meme.textShadowSize}px ${meme.textShadowSize}px 5px ${meme.textShadowColor}`,
            fontWeight: meme.fontWeight     
        }
    )
}