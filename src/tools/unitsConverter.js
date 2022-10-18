function getPixels(percentage, width, rate=100) {
    return percentage * width / rate
}

function getPercentages (pixels, width, rate=100) {
    return rate * pixels / width 
}

export {getPixels, getPercentages}