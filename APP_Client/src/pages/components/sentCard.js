import React from "react"
import "../../App.css"

const app = window.require('electron').remote;
const axios = app.require('axios');

const Transfer = ({ sent }) => {

    if (sent.date) {
        var dateTotale = sent.date.split('T');
        var date = dateTotale[0];
        var horairereTotal = dateTotale[1].split('.');
        var horaire = horairereTotal[0].split(':')
        var heure = Number(horaire[0]) + 2;

        var trueHour = heure + ':' + horaire[1] + ':' + horaire[2]
        const deleteTransfer = async () => {
            await axios.post("http://18.233.162.213:3001/api/transferDeleteTest", { id: sent.idTransfer }).then((response) => {
                console.log(response.data);
            });
        }

        return (

            <div className="transfertCard">
                <div className="clickableCard">
                    <div>{sent.pseudo}</div>
                    <div>{date}</div>
                    <div>{trueHour}</div>
                </div>
                <div>
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