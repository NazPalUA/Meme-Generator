import React, { useContext } from "react"
import { MemeContext } from "../context/MemeContext"
import './SettingsSidebar.css'
import resizeLeft from "../images/resize-left.png"
import resizeRight from "../images/resize-right.png"

export default function SettingsSidebar() {
    const {
        meme, 
        addLine, 
        toggleUpperCase, 
        changeTextSize, 
        changeShadowSize,
        handleSettingsChange,
        centerLine
    } = useContext(MemeContext)

    const fontsData = {
        fontWeight: [            
            {name: "Medium", value: 500}, 
            {name: "Bold", value: 700}
        ],
        fontFamily: [
            // {name: "Arial", value: "Arial, Helvetica, sans-serif"},
            {name: "Calibri", value: "Calibri, Candara, sans-serif"}, 
            {name: "Roboto", value: "Roboto, sans-serif"}
        ]
    }

    const fontsFamilyArrHTML = fontsData.fontFamily.map(font => (
        <React.Fragment key={font.name}>
            <input 
                className="settings__radio"
                type="radio" 
                name="fontFamily" 
                id={font.name}
                value={font.value}
                checked={meme.fontFamily === font.value}
                onChange={handleSettingsChange}
            />
            <label htmlFor={font.name} className="settings__item-label no-select">
                {font.name}
            </label> 
        </React.Fragment>
    ))

    const fontsWeightArrHTML = fontsData.fontWeight.map(weight => (
        <React.Fragment key={weight.value}>
            <input
                className="settings__radio"
                id={weight.value}
                type="radio" 
                name="fontWeight" 
                value={weight.value}
                checked={`${meme.fontWeight}` === `${weight.value}`}
                onChange={handleSettingsChange}
            />
            <label htmlFor={weight.value} className="settings__item-label no-select">
                {weight.name}
            </label>
        </React.Fragment>
    ))

    return (
        <div className="settings">
            <button 
                className="settings__item settings__btn settings__add-line-btn"
                onClick={addLine}
            >
                Add Line
            </button>

            <div className="settings__item">
                <input 
                    className="settings__checkbox"
                    type="checkbox" 
                    id="upper-case"
                    checked={meme.isUpperCase}
                    onChange={toggleUpperCase}
                />
                <label 
                    className="settings__item-label no-select" 
                    htmlFor="upper-case"
                >
                    Upper Case
                </label>
            </div>

            <div className="settings__item">
                <span className="settings__item-title no-select">
                    Text size: 
                </span> 
                <div className="settings__list">
                    <button 
                        className="settings__btn_re-size"
                        value={"-"}
                        onClick={(e) => changeTextSize(e.currentTarget)}
                    >
                        <img
                            src={resizeLeft}
                            alt=""
                        />             
                    </button>
                    <span>{meme.fontSize}</span>
                    <button 
                        className="settings__btn_re-size"
                        value={"+"}
                        onClick={(e) => changeTextSize(e.currentTarget)}
                    >
                    <img
                        src={resizeRight}
                        alt=""
                        />  
                    </button>
                </div>
            </div>

            <div className="settings__item">
                <span className="settings__item-title no-select">
                    Text color:
                </span>
                <div className="settings__list">
                    <button
                        className="settings__btn-color"
                        value={"#000000"}
                        name="color"
                        onClick={handleSettingsChange}
                        style={{backgroundColor: "black"}}
                    ></button>
                    <button
                        className="settings__btn-color"
                        value={"#ffffff"}
                        name="color"
                        onClick={handleSettingsChange}
                        style={{backgroundColor: "white"}}
                    ></button>
                    <input 
                        className="settings__btn-color settings__btn-color_input"
                        type="color"
                        name="color"
                        onChange={handleSettingsChange}
                        value={meme.color}
                    />
                </div>
            </div>

            <div className="settings__item">
                <span className="settings__item-title no-select">
                    Font:
                </span>
                <div className="settings__list">
                    {fontsFamilyArrHTML}
                </div>
            </div>

            <div 
                className="settings__item"
            >
                <span className="settings__item-title no-select">
                    Shadow:
                </span>
                <div className="settings__list">
                    <button
                        className="settings__btn_re-size"
                        value={"-"}
                        onClick={(e) => changeShadowSize(e.currentTarget)}
                    >
                        <img
                            src={resizeLeft}
                            alt=""
                        /> 
                    </button>
                    <input 
                        className="settings__btn-color"
                        type="color"
                        name="textShadowColor"
                        onChange={handleSettingsChange}
                        value={meme.textShadowColor}
                    />
                    <button
                        className="settings__btn_re-size"
                        value={"+"}
                        onClick={(e) => changeShadowSize(e.currentTarget)}
                    >
                        <img
                            src={resizeRight}
                            alt=""
                        /> 
                    </button>
                </div>
            </div>
            <div className="settings__item">
                <span className="settings__item-title no-select">Font weight:</span>
                <div className="settings__list">
                    {fontsWeightArrHTML}
                </div>
            </div>
            <button 
                className="settings__item settings__btn settings__btn_center"
                onClick={centerLine}
            >
                Center Text
            </button>
        </div>
    )
}