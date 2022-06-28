import React from "react"
import "../App.css"

const New = () => {
    return (
        <div className="new-mess-column">
            <div className="line-to">
                <div className="labeltext">
                    TO :
                </div>
                <div>
                    <input className="new_input" type="text" id="to" placeholder="pseudo du destinataire" />
                </div>
            </div>
            <div className="line-to">
                <div className="labeltext">
                    Attachement :
                </div>
                <div>
                    <input className="new_input" type="file" id="attachement" placeholder="Attachement" />
                </div>
            </div>
            <div className="content-message">
                <textarea className="content-message-area" id="content-message-id" placeholder="Votre message" />
            </div>
            <div>
                
            </div>
        </div>
    )
}

export default New