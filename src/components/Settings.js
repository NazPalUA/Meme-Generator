import React, {useContext} from "react"
import '../css/settings.css'
import {MemeContext} from "../context/MemeContext"

export default function Settings() {
    const {
        meme, 
        addLine, 
        toggleUpperCase, 
        changeTextSize, 
        changeShadowSize,
        handleSettingsChange,
        centerText
    } = useContext(MemeContext)

    const fontsData = {
        fontWeight: [            
            {name: "Regular", value: 400}, 
            {name: "Semi Bold", value: 500}, 
            {name: "Bold", value: 600}
        ],
        fontFamily: [
            {name: "Arial", value: "Arial, Helvetica, sans-serif"}, 
            {name: "Calibri", value: "Calibri, Candara, sans-serif"}, 
            {name: "Times New Roman", value: "Times New Roman, Times, serif"}
        ]
    }

    const fontsFamilyArrHTML = fontsData.fontFamily.map(font => (
        <React.Fragment key={font.name}>
            <input 
                type="radio" 
                name="fontFamily" 
                id={font.name}
                value={font.value}
                checked={meme.fontFamily === font.value}
                onChange={handleSettingsChange}
            />
            <label htmlFor={font.name}>
                {font.name}
            </label> 
        </React.Fragment>
    ))

    const fontsWeightArrHTML = fontsData.fontWeight.map(weight => (
        <React.Fragment key={weight.value}>
            <input
                id={weight.value}
                type="radio" 
                name="fontWeight" 
                value={weight.value}
                checked={`${meme.fontWeight}` === `${weight.value}`}
                onChange={handleSettingsChange}
            />
            <label htmlFor={weight.value} className="no-select">{weight.name}</label>
        </React.Fragment>
    ))

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
                    name="color"
                    onClick={handleSettingsChange}
                >black</button>
                <button
                    className="settings__btn settings__btn_color"
                    value={"#ffffff"}
                    name="color"
                    onClick={handleSettingsChange}
                >white</button>
                <input 
                    // className="settings__btn settings__btn_color"
                    type="color"
                    name="color"
                    onChange={handleSettingsChange}
                    value={meme.color}
                />
            </div>

            <div className="settings__item">
                <span className="settings__item-text no-select">
                    Font:
                </span>
                {fontsFamilyArrHTML}
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
                    name="textShadowColor"
                    onChange={handleSettingsChange}
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
                {fontsWeightArrHTML}
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