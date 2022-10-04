import React, {useContext} from "react"
import '../css/settings.css'
import {MemeContext} from "../context/MemeContext"

export default function Settings() {
    const {addLine, moveLine} = useContext(MemeContext)
    return (
        <div className="settings">
            <section className="settings__section">
                <button 
                    className="settings__btn settings__add-line-btn"
                    onClick={addLine}
                >
                    Add Line
                </button>
            </section>
            <section className="settings__section">
                <h4 className="settings__section-title ">
                    Text Settings
                </h4>
                <div>
                    <input type="checkbox" name="upperCase" id="upper-case" />
                    <label htmlFor="upper-case">Upper Case</label>
                </div>
                <p>Text size: 16px ←   →</p>
                <div>
                    <span>Text color: </span>
                    <button>black</button>
                    <button>white</button>
                    <input type="color" />
                </div>
                <div>
                    <span>Font:</span>
                    <span>Arial</span>
                    <span>Calibri</span>
                    <span>Times New Roman</span>
                </div>
                <p>Shadow blur: 16px ←   →</p>
                <div>
                    <span>Font weight</span>
                    <input type="radio" name="font-weight"></input>
                    <label>Regular</label>
                    <input type="radio" name="font-weight"></input>
                    <label>Semi Bold</label>
                    <input type="radio" name="font-weight"></input>
                    <label>Bold</label>
                </div>
            </section>
            <section className="settings__section">
                <h4 className="settings__section-title">
                    Position Settings
                </h4>
                <div className="settings__position-btn-container">
                    <button className="settings__btn settings__btn_center">
                        Center Text
                    </button>
                    <button 
                        className="settings__btn settings__btn_left"
                        onClick={() => moveLine("left")}
                    >
                        ←
                    </button>
                    <button 
                        className="settings__btn settings__btn_right"
                        onClick={() => moveLine("right")}
                    >
                        →
                    </button>
                    <button 
                        className="settings__btn settings__btn_top "
                        onClick={() => moveLine("top")}
                    >
                        ↑
                    </button>
                    <button 
                        className="settings__btn settings__btn_bottom"
                        onClick={() => moveLine("bottom")}
                    >
                        ↓
                    </button>
                </div>
            </section>
        </div>
    )
}