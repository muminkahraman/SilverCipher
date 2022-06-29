import React from "react"
import "../App.css"
import { useStateValue } from '../state/StateProvider';
import { Link } from "react-router-dom";

const ReceivedMessage = () => {

    const [{ message }] = useStateValue();

    return (
        <>
            <Link className="retourArriere" to="/menu/recept">
                <div className="fleche">&#8592; </div>
            </Link>

            <div className="messageBody">
                {message}
            </div>
        </>
    )
}

export default ReceivedMessage;