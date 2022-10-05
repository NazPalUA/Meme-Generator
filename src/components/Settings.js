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
        setFontFamily
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

            <p className="settings__item">Shadow blur: 16px ←   →</p>
            <div className="settings__item">
                <span>Font weight</span>
                <input type="radio" name="font-weight"></input>
                <label>Regular</label>
                <input type="radio" name="font-weight"></input>
                <label>Semi Bold</label>
                <input type="radio" name="font-weight"></input>
                <label>Bold</label>
            </div>
            <button className="settings__btn settings__btn_center">
                Center Text
            </button>
        </div>
    )
}