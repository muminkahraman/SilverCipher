import React, { useState } from "react";
import "../App.css";
//import Axios from "axios";
import { useStateValue } from "../state/StateProvider";

const app = window.require("electron").remote;
const fs = app.require("fs");
const crypto = app.require("crypto");
const FormData = app.require("form-data");
const Axios = app.require("axios");

const New = () => {
    const [file, setFile] = useState(null);
    const [dest, setDest] = useState(null);
    const [mess, setMess] = useState(null);

    const { username } = useStateValue()[0];
    var idDest;
    var result;
    var url;

    const sendMessage = async () => {

        const promise = Axios.post("http://18.233.162.213:3001/api/userbypseudo", {
            pseudo: dest,
        }).then((res) => {
            let url =
                "http://18.233.162.213:3001/silver-cipher/data/public_keys/" +
                res.data[0].cle_publique +
                ".pem";

            return [res.data[0].idUser, url];
        });

        result = await promise;
        idDest = result[0];
        url = result[1];

        const reponse = await fetch(url);
        var publicKey = await reponse.text(); // .json() is asynchronous and therefore must be awaited

        fs.writeFileSync('./temp/message', mess)

        let srcFile = fs.readFileSync(file, "hex");
        let srcMess = fs.readFileSync('./temp/message', "hex");


        let key = crypto.randomBytes(16).toString("hex");
        let algorithm = "aes-256-cbc";
        let iv = Buffer.from("979843777c873b5a2060c2ad968a20d9", "hex");

        let cipherFile = crypto.createCipheriv(algorithm, key, iv);
        let updFile = cipherFile.update(srcFile, "hex", "hex") + cipherFile.final("hex");

        let cipherMess = crypto.createCipheriv(algorithm, key, iv);
        let updMess = cipherMess.update(srcMess, "hex", "hex") + cipherMess.final("hex");

        fs.writeFileSync("./temp/encfile", updFile, { encoding: "hex" });
        fs.writeFileSync("./temp/encmessage", updMess, { encoding: "hex" });

        let separatedFile = file.split("\\");
        let fileName = separatedFile[separatedFile.length - 1];
        let separatedFileName = fileName.split(".");
        let extension = separatedFileName[separatedFileName.length - 1]

        let name_enc_file = crypto.randomBytes(16).toString("hex") + "." + extension;
        let name_enc_keyfile = crypto.randomBytes(16).toString("hex");
        let name_enc_mess = crypto.randomBytes(16).toString("hex");
        let name_enc_sign = crypto.randomBytes(16).toString("hex");

        const form_file = new FormData();
        form_file.append(
            "file",
            fs.readFileSync("./temp/encfile"),
            name_enc_file
        );

        Axios.post("http://18.233.162.213:3001/api/upload/enc_file", form_file, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((response) => {
            console.log(response.data.message);
        });


        let form_mess = new FormData();
        form_mess.append(
            "file",
            fs.createReadStream("./temp/encmessage"),
            name_enc_mess
        );

        Axios.post("http://18.233.162.213:3001/api/upload/enc_message", form_mess, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((response) => {
            console.log(response.data.message);
        });

        /////////////////////////////////////////////////////////////////////////////////////////////////////////

        fs.writeFileSync("./temp/clear_key", key);

        const keyToEncrypt = fs.readFileSync("./temp/clear_key");

        const encryptedData = crypto.publicEncrypt(
            {
                key: publicKey,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: "sha256",
            },

            Buffer.from(keyToEncrypt)
        );

        fs.writeFileSync("./temp/crypted_key", encryptedData);

        let form_key = new FormData();
        form_key.append(
            "file",
            fs.createReadStream("./temp/crypted_key"),
            name_enc_keyfile
        );

        Axios.post("http://18.233.162.213:3001/api/upload/enc_key", form_key, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((response) => {
            console.log(response.data.message);
        });

        ///////////////////////////////////////////////////////////////////////////////////////////////

        let privateKey = fs.readFileSync('./keys/private.pem');

        const data = fs.readFileSync('./temp/crypted_key');
        const algorithmSign = "SHA256";

        const signature = crypto.sign(algorithmSign, data, privateKey);
        fs.writeFileSync('./temp/signature', signature);

        let form_sign = new FormData();
        form_sign.append(
            "file",
            fs.createReadStream("./temp/signature"),
            name_enc_sign
        );

        Axios.post("http://18.233.162.213:3001/api/upload/enc_sign", form_sign, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((response) => {
            console.log(response.data.message);
        });



        /*
        let src = fs.readFileSync(file, { encoding: "hex" });

        let key = crypto.randomBytes(16).toString("hex");
        let algorithm = "aes-256-cbc";
        let iv = Buffer.from("979843777c873b5a2060c2ad968a20d9", "hex");
        let cipher = crypto.createCipheriv(algorithm, key, iv);

        let upd = cipher.update(src, "hex", "hex");
        fs.writeFileSync("./temp/encfile", upd);

        fs.writeFileSync("./temp/message", mess);
        let msgFile = fs.readFileSync('./temp/message', { encoding: "hex" });
        let msgUpd = cipher.update(msgFile, "hex", "hex");
        console.log(msgUpd)
        fs.writeFileSync("./temp/encmessage", msgUpd);


        fs.writeFileSync("./temp/keyfile", key);

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
        let name_enc_mess = crypto.randomBytes(16).toString("hex");

        const form_file = new FormData();
        form_file.append(
            "file",
            fs.readFileSync("./temp/encfile"),
            name_enc_file
        );

        Axios.post("http://18.233.162.213:3001/api/upload/enc_file", form_file, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((response) => {
            console.log(response.data.message);
        });

        let form_key = new FormData();
        form_key.append(
            "file",
            fs.createReadStream("./temp/enckey"),
            name_enc_keyfile
        );

        Axios.post("http://18.233.162.213:3001/api/upload/enc_key", form_key, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((response) => {
            console.log(response.data.message);
        });

        
        let form_mess = new FormData();
        form_mess.append(
            "file",
            fs.createReadStream("./temp/encmessage"),
            name_enc_mess
        );

        Axios.post("http://18.233.162.213:3001/api/upload/enc_message", form_mess, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((response) => {
            console.log(response.data.message);
        });
        */


        Axios.post("http://18.233.162.213:3001/api/newtransfer", {
            expediteur: username,
            destinataire: idDest,
            pathFichCrypt: name_enc_file,
            pathCleCrypt: name_enc_keyfile,
            pathCont: name_enc_mess,
            pathSign: name_enc_sign
        })


        fs.unlinkSync('./temp/encfile')
        fs.unlinkSync('./temp/crypted_key')
        fs.unlinkSync('./temp/clear_key')
        fs.unlinkSync('./temp/encmessage')
        fs.unlinkSync('./temp/message')
        fs.unlinkSync('./temp/signature')

        setDest('')
        setFile('')
        setMess('')

        document.getElementById("to").value = "";
        document.getElementById("attachement").value = "";
        document.getElementById("content-message-id").value = "";

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
                            if (event.target.files[0] !== undefined) {
                                setFile(event.target.files[0].path);
                            }
                            else {
                                //elsecase
                            }
                        }}
                        placeholder="Attachement"
                    />
                </div>
            </div>
            <div className="content-message">
                <textarea
                    className="content-message-area"
                    id="content-message-id"
                    onChange={(e) => {
                        setMess(e.target.value);
                    }}
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
