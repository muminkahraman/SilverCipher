import React from "react"
import "../App.css"
import { Link } from "react-router-dom"
import { useStateValue } from '../state/StateProvider';

const Verification = () => {

    const [{passwordAccepted, username}] = useStateValue();

    return (
        <>

            {passwordAccepted ?
                <div className="verifContain">
                    <h2>Bonjour {username}</h2>
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