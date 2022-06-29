import React, { useState } from "react";
import "../App.css";
import { useStateValue } from "../state/StateProvider";
import Sent from "./components/sentCard";

const app = window.require("electron").remote;
const axios = app.require("axios");

function Envoi() {
    const [{ username }] = useStateValue();
    const [data, setData] = useState([{}]);

    const getData = async () => {
        await axios
            .post("http://localhost:3001/api/transfer/sent", {
                pseudo: username,
            })
            .then((response) => {
                setData(response.data);
            });
    };

    getData();

    return (
        <>
            <div className="boite">
                {data.map((transfer) => (
                    <Sent key={transfer.idTransfer} transfer={transfer} />
                ))}
            </div>
        </>
    );
}

export default Envoi;
