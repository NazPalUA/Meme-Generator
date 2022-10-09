import React, {useContext} from "react"
import '../css/settings.css'
import {MemeContext} from "../context/MemeContext"

export default function Settings() {
    const {
        meme, 
        addLine, 
        toggleUpperCase, 
        changeTextSize, 
        setColor, 
        setFontFamily,
        setTextShadowColor,
        changeShadowSize,
        setFontWeight,
        centerText
    } = useContext(MemeContext)
    return (
        <div className="settings">
            <button 
                className="settings__btn settings__add-line-btn"
                onClick={addLine}
            >
                Add Line
            </button>

            <div className="settings__item">
                <input 
                    type="checkbox" 
                    id="upper-case"
                    checked={meme.isUpperCase}
                    onChange={toggleUpperCase}
                />
                <label 
                    className="settings__item-text no-select" 
                    htmlFor="upper-case"
                >Upper Case</label>
            </div>

            <div className="settings__item">
                <span className="settings__item-text no-select">
                    Text size: {meme.fontSize}
                </span> 
                <button 
                    className="settings__btn settings__btn_text-size"
                    value={"-"}
                    onClick={changeTextSize}
                >←</button>
                <button 
                    className="settings__btn settings__btn_text-size"
                    value={"+"}
                    onClick={changeTextSize}
                >→</button>
            </div>

            <div className="settings__item">
                <span className="settings__item-text no-select">
                    Text color:
                </span>
                <button
                    className="settings__btn settings__btn_color"
                    value={"#000000"}
                    onClick={setColor}
                >black</button>
                <button
                    className="settings__btn settings__btn_color"
                    value={"#ffffff"}
                    onClick={setColor}
                >white</button>
                <input 
                    // className="settings__btn settings__btn_color"
                    type="color"
                    onChange={setColor}
                    value={meme.color}
                />
            </div>

            <div className="settings__item">
                <span className="settings__item-text no-select">
                    Font:
                </span>
                <input 
                    type="radio" 
                    name="font-family" 
                    id="Arial"
                    value="Arial, Helvetica, sans-serif"
                    checked={meme.fontFamily === "Arial, Helvetica, sans-serif"}
                    onChange={setFontFamily}
                />
                <label htmlFor="Arial">
                    Arial
                </label> 
                <input 
                    type="radio" 
                    name="font-family" 
                    id="Calibri"
                    value="Calibri, Candara, sans-serif"
                    checked={meme.fontFamily === "Calibri, Candara, sans-serif"}
                    onChange={setFontFamily}
                />
                <label htmlFor="Calibri">
                    Calibri
                </label> 
                <input 
                    type="radio" 
                    name="font-family" 
                    id="Times"
                    value="Times New Roman, Times, serif"
                    checked={meme.fontFamily === "Times New Roman, Times, serif"}
                    onChange={setFontFamily}
                />
                <label htmlFor="Times">
                    Times New Roman
                </label> 
            </div>

            <div 
                className="settings__item"
            >
                <span className="settings__item-text no-select">
                    Shadow:
                </span>
                <button
                    className="settings__btn settings__btn_shadow-size"
                    value={"+"}
                    onClick={changeShadowSize}
                >increase Shadow</button>
                <input 
                    // className="settings__btn settings__btn_color"
                    type="color"
                    onChange={setTextShadowColor}
                    value={meme.textShadowColor}
                />
                <button
                    className="settings__btn settings__btn_shadow-size"
                    value={"-"}
                    onClick={changeShadowSize}
                >Decrease Shadow</button>
            </div>
            <div className="settings__item">
                <span>Font weight</span>
                <input
                    id="weight-regular"
                    type="radio" 
                    name="font-weight" 
                    value="400" 
                    checked={meme.fontWeight === "400"}
                    onChange={setFontWeight}
                />
                <label htmlFor="weight-regular">Regular</label>
                <input
                    id="weight-semi-bold"
                    type="radio" 
                    name="font-weight" 
                    value="500"
                    checked={meme.fontWeight === "500"}
                    onChange={setFontWeight}
                />
                <label htmlFor="weight-semi-bold">Semi Bold</label>
                <input
                    id="weight-bold"
                    type="radio" 
                    name="font-weight" 
                    value="600"
                    checked={meme.fontWeight === "600"}
                    onChange={setFontWeight}
                />
                <label htmlFor="weight-bold">Bold</label>
            </div>
            <button 
                className="settings__btn settings__btn_center"
                onClick={centerText}
            >
                Center Text
            </button>
        </div>
    )
}