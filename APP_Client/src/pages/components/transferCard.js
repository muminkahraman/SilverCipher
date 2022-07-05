import React from "react"
import "../../App.css"
import { NavLink } from 'react-router-dom';
import { useStateValue } from '../../state/StateProvider';

const app = window.require('electron').remote;
const axios = app.require('axios');
const fs = app.require('fs')
const https = require('http');
const crypto = app.require('crypto')

const Transfer = ({ transfer }) => {

    const [{ }, dispatch] = useStateValue();

    const updateMessage = () => {
        dispatch({ type: "SET_MESSAGE", payload: { message: 'Salut' } })
    }

    const download = async () => {

        let urlFile = "http://localhost:3001/silver-cipher/data/enc_files/" + transfer.path_fich_crypt
        let urlKey = "http://localhost:3001/silver-cipher/data/enc_keys/" + transfer.path_cle_crypt
        let urlMess = "http://localhost:3001/silver-cipher/data/enc_message/" + transfer.path_contexte

        https.get(urlFile, (res) => {
            const file = fs.createWriteStream(`received_file`);
            res.pipe(file);

            file.on('finish', () => {
                file.close();
                console.log(`File downloaded!`);

                https.get(urlKey, (res) => {
                    const file = fs.createWriteStream(`received_key`);
                    res.pipe(file);

                    file.on('finish', () => {
                        file.close();
                        console.log(`Key downloaded!`);

                        const privateKey = fs.readFileSync('./keys/private.pem')

                        //let key = "6c7e467c8fe130e2d96a37dfb57bd78a"
                        const cryptedKey = fs.readFileSync('./received_key');

                        const decryptedData = crypto.privateDecrypt(
                            {
                                key: privateKey,
                                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                                oaepHash: "sha256",
                            },

                            cryptedKey
                        );

                        fs.writeFileSync("./decrypted_key", decryptedData.toString());

                        const decryptedKey = fs.readFileSync('./decrypted_key')

                        let algorithm = "aes-256-cbc";
                        let iv = Buffer.from("979843777c873b5a2060c2ad968a20d9", "hex");
                        let encFile = fs.readFileSync("./received_file", { encoding: "hex" });

                        let decipher = crypto.createDecipheriv(algorithm, decryptedKey, iv);
                        let dec = decipher.update(encFile, "hex", "hex") + decipher.final("hex");
                        fs.writeFileSync("./decfilee.jpg", dec, "hex");

                    });

                }).on("error", (err) => {
                    console.log("Error: ", err.message);
                });

            });

        }).on("error", (err) => {
            console.log("Error: ", err.message);
        });



        /*
        let promiseFile = fetch(urlFile)
        let promiseKey = fetch(urlKey)
        let promiseMess = fetch(urlMess)

        console.log(promiseFile)

        var File = await (await promiseFile).text();
        var Key = await (await promiseKey).text();
        var Mess = await (await promiseMess).text();

        fs.writeFileSync('./temp/received_file', File)
        fs.writeFileSync('./temp/received_key', Key)
        fs.writeFileSync('./temp/received_mess', Mess)
        */


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
                    <button className="download" onClick={() => download()}>Download</button>
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