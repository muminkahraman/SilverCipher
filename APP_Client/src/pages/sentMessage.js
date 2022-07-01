import React from "react"
import "../App.css"
import { useStateValue } from '../state/StateProvider';
import { Link } from "react-router-dom";

const SentMessage = () => {

    const [{ message }] = useStateValue();

    console.log('there')

    return (
        <>
            <Link className="retourArriere" to="/menu/envoi">
                <div className="fleche">&#8592; </div>
            </Link>

            <div className="messageBody">
                {message}
            </div>
        </>
    )
}

export default SentMessage;