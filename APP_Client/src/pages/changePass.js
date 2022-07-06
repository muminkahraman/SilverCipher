import React, { useState } from "react"
import "../App.css"
import { Link } from "react-router-dom"
import { useStateValue } from '../state/StateProvider';

const ChangePass = () => {

    const [newPass, setNewPass] = useState(null);
    const [newPassVerif, setNewPassVerif] = useState(null);

    const [{username, email, tel }, dispatch] = useStateValue();

    function setInReducer() {
        dispatch({ type: "SET_PASSWORD", payload: {username: username, email : email, tel: tel, password: newPass } })
    }

    return (
        <div className="changePassForm">
            <div className="changePassLabel">Nouveau mot de passe</div>
            <input
                onChange={(e) => {
                    setNewPass(e.target.value);
                }}
                className="changePassInput"
            />
            <div className="changePassLabel">Confirmer le nouveau mot de passe</div>
            <input
                onChange={(e) => {
                    setNewPassVerif(e.target.value);
                }}
                className="changePassInput"
            />
            {(newPass === newPassVerif) ?
            <Link to="/" className="changePassValider" onClick={() => setInReducer()}>Valider</Link>
            : <div>Le mot de passe et la v&#233;rification doivent &#234;tre &#233;gaux</div>
            }
        </div>
    )
}

export default ChangePass;