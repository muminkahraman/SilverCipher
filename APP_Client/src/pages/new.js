import React, { useState } from "react";
import "../App.css";
//import Axios from "axios";
import { useStateValue } from "../state/StateProvider";

const app = window.require("electron").remote;
const fs = app.require("fs");
const crypto = app.require("crypto");
const http = app.require("http");
const FormData = app.require("form-data");
const Axios = app.require("axios");

const New = () => {
    const [file, setFile] = useState(null);
    const [dest, setDest] = useState(null);
    const { username } = useStateValue()[0];
    var idDest;

    const sendMessage = async () => {
        console.log(dest);

        const promise = Axios.post("http://localhost:3001/api/userbypseudo", {
            pseudo: dest,
        }).then((res) => {
            console.log(res.data);
            let url =
                "http://localhost:3001/silver-cipher/data/public_keys/" +
                res.data[0].cle_publique +
                ".pem";

            

            http.get(url, (result) => {
                // Image will be stored at this path
                const path = `./temp/cle_destinataire.pem`;
                const filePath = fs.createWriteStream(path);
                result.pipe(filePath);
                filePath.on("finish", () => {
                    filePath.close();
                    console.log("Download Completed");
                });
            });
            return res.data[0].idUser;
        });

        idDest = await promise;
        console.log(idDest);

        const publicKey = Buffer.from(
            fs.readFileSync("./temp/cle_destinataire.pem", {
                encoding: "utf-8",
            })
        );

        let src = fs.readFileSync(file, { encoding: "hex" });
        let key = crypto.randomBytes(16).toString("hex");
        let namee = crypto.randomBytes(16).toString("hex");
        let algorithm = "aes-256-cbc";
        console.log(namee);
        let iv = Buffer.from("979843777c873b5a2060c2ad968a20d9", "hex");
        //let output = fs.createWriteStream("./temp/finceenc");
        let cipher = crypto.createCipheriv(algorithm, key, iv);
        let upd = cipher.update(src, "hex", "hex");
        let output = fs.writeFileSync("./temp/encfile", upd);
        //src.pipe(cipher).toString("hex").pipe(output);
        let keyfile = crypto.randomBytes(16).toString("hex");
        let output2 = fs.writeFileSync("./temp/keyfile", key);
        //let output2 = fs.writeFileSync("./temp/key", key);

        const dataToEncrypt = fs.readFileSync("./temp/keyfile", {
            encoding: "utf-8",
        });

        const encryptedData = crypto.publicEncrypt(
            {
                key: publicKey,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: "sha256",
            },
            // We convert the data string to a buffer using `Buffer.from`
            Buffer.from(dataToEncrypt)
        );

        fs.writeFileSync("./temp/enckey", encryptedData.toString("base64"), {
            encoding: "utf-8",
        });

        let name_enc_file = crypto.randomBytes(16).toString("hex");
        let name_enc_keyfile = crypto.randomBytes(16).toString("hex");

        const form_file = new FormData();
        form_file.append(
            "file",
            fs.readFileSync("./temp/encfile"),
            name_enc_file
        );

        Axios.post("http://localhost:3001/api/upload/enc_file", form_file, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((response) => {
            console.log(response.data);
        });

        let form_key = new FormData();
        form_key.append(
            "file",
            fs.createReadStream("./temp/enckey"),
            name_enc_keyfile
        );
        Axios.post("http://localhost:3001/api/upload/enc_key", form_key, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((response) => {
            console.log(response.data);
        });

        Axios.post("http://localhost:3001/api/newtransfer", {
            expediteur: username,
            destinataire: idDest,
            pathFichCrypt: name_enc_file,
            pathCleCrypt: name_enc_keyfile,
            pathCont: "nononononnonnoonn",
        }).then((response) => {
            console.log(response.data);
        });
    };

    return (
        <div className="new-mess-column">
            <div className="line-to">
                <div className="labeltext">
                    &#192; :
                </div>
                <div>
                    <input
                        className="new_input"
                        type="text"
                        id="to"
                        placeholder="Destinataire"
                        onChange={(e) => setDest(e.target.value)}
                    />
                </div>
            </div>
            <div className="line-to">
                <div className="labeltext">
                    Pi&#232;ce jointe :
                </div>
                <div>
                    <input
                        className="new_input"
                        type="file"
                        id="attachement"
                        onChange={(event) => {
                            setFile(event.target.files[0].path);
                        }}
                        placeholder="Attachement"
                    />
                </div>
            </div>
            <div className="content-message">
                <textarea
                    className="content-message-area"
                    id="content-message-id"
                    placeholder="Votre message"
                />
            </div>
            <div className="new-bouton">
                <button
                    className="button_envoyer"
                    onClick={() => sendMessage(file)}
                >
                    Envoyer
                </button>
            </div>
        </div>
    );
};

export default New;
