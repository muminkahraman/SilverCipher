import React from "react"
import "../../App.css"
import { NavLink } from 'react-router-dom';
import { useStateValue } from '../../state/StateProvider';

const app = window.require('electron').remote;
const axios = app.require('axios');

const Transfer = ({ transfer }) => {

    const [{ }, dispatch] = useStateValue();

    const updateMessage = () => {
        dispatch({ type: "SET_MESSAGE", payload: { message: 'Salut' } })
    }

    if (transfer.date) {
        var dateTotale = transfer.date.split('T');
        var date = dateTotale[0];
        var horairereTotal = dateTotale[1].split('.');
        var horaire = horairereTotal[0].split(':')
        var heure = Number(horaire[0]) + 4;

        var trueHour = heure + ':' + horaire[1] + ':' + horaire[2]
        const deleteTransfer = async () => {
            await axios.post("http://localhost:3001/api/transferDeleteTest", { id: transfer.idTransfer }).then((response) => {
                console.log(response.data);
            });
        }

        return (

            <div className="transfertCard">
                <NavLink className="clickableCard" to="/menu/receivedmessage" onClick={() => updateMessage()}>
                    <div>{transfer.pseudo}</div>
                    <div>{date}</div>
                    <div>{trueHour}</div>
                </NavLink>
                <div>
                    <button className="download">Download</button>
                    <button className="delete" onClick={() => deleteTransfer()}>X</button>
                </div>
            </div>

        )
    }

    return (
        <></>
    )


}

export default Transfer;