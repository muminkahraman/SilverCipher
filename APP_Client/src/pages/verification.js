import React from "react"
import "../App.css"
import { Link } from "react-router-dom"

const script = require('../script')

const Verification = () => {

    const name = script.getName();

    return (
        <>

            {script.getPass() ?
                <div className="verifContain">
                    <h2>Bonjour {name}</h2>
                    <Link to="/menu/recept" className="verifButton" >Aller au menu</Link>
                </div>
                :
                <div className="verifContain">
                    <h2>Mauvais mot de passse</h2>
                    <Link to="/" className="verifButton" >R&#xE9;essayer</Link>
                </div>
            }

        </>
    )
}


export default Verification;