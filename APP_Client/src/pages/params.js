import React from "react"
import "../App.css"
import { Link } from "react-router-dom"
import { useStateValue } from '../state/StateProvider';


const Params = () => {

    const dispatch = useStateValue()[1];

    function resetStore() {
        dispatch({ type: "RESET" })
    }


    return (
        <>
            <div className="paramBox">
                <Link to='/' onClick={() => resetStore()} className="paramItem">
                    Supprimer mon compte
                </Link>
                <Link to='/menu/changepass' className="paramItem">
                    Changer mon mot de passe
                </Link>
                <Link to='/' className="paramItem">
                    Verouiller
                </Link>
            </div>
        </>
    )
}

export default Params