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

    const dispatch = useStateValue()[1];

    const verify = async () => {

        let urlKey = "http://18.233.162.213:3001/silver-cipher/data/enc_keys/" + transfer.path_cle_crypt
        let urlSign = "http://18.233.162.213:3001/silver-cipher/data/enc_signs/" + transfer.path_sign

        const promise = axios.post("http://18.233.162.213:3001/api/userbypseudo", {
            pseudo: transfer.pseudo,
        }).then((res) => {
            let url =
                "http://18.233.162.213:3001/silver-cipher/data/public_keys/" +
                res.data[0].cle_publique +
                ".pem";

            return url;
        });

        let urlPub = await promise;

        https.get(urlKey, (res) => {
            const file = fs.createWriteStream(`./temp/received_key`);
            res.pipe(file);

            file.on('finish', () => {
                file.close();
                console.log(`Key downloaded!`);


                https.get(urlSign, (res) => {
                    const file = fs.createWriteStream(`./temp/received_sign`);
                    res.pipe(file);


                    file.on('finish', () => {
                        file.close();
                        console.log(`Signature downloaded!`);

                        https.get(urlPub, (res) => {
                            const file = fs.createWriteStream(`./temp/received_pub`);
                            res.pipe(file);


                            file.on('finish', () => {
                                file.close();
                                console.log(`Stranger public key downloaded!`);

                                const data = fs.readFileSync('./temp/received_key');
                                const algorithmSign = "SHA256";

                                let Public = fs.readFileSync('./temp/received_pub');
                                let signatureLue = Buffer.from(fs.readFileSync('./temp/received_sign'));

                                // Verifying signature using crypto.verify() function
                                const isVerified = crypto.verify(algorithmSign, data, Public, signatureLue);

                                // Printing the result
                                if (isVerified) {
                                    alert(`La signature de cet utilisateur est v\u00e9rifi\u00e9e`);
                                }
                                else {
                                    alert(`La signature de cet utilisateur n'est pas bonne`)
                                }

                                fs.unlinkSync('./temp/received_key')
                                fs.unlinkSync('./temp/received_pub')
                                fs.unlinkSync('./temp/received_sign')

                            });

                        }).on("error", (err) => {
                            console.log("Error: ", err.message);
                        });

                    });

                }).on("error", (err) => {
                    console.log("Error: ", err.message);
                });


            });

        }).on("error", (err) => {
            console.log("Error: ", err.message);
        });

    }

    const updateMessage = () => {

        let urlMess = "http://18.233.162.213:3001/silver-cipher/data/enc_message/" + transfer.path_contexte
        let urlKey = "http://18.233.162.213:3001/silver-cipher/data/enc_keys/" + transfer.path_cle_crypt
        let urlSign = "http://18.233.162.213:3001/silver-cipher/data/enc_signs/" + transfer.path_sign
        let urlPub = "http://18.233.162.213:3001/silver-cipher/data/public_keys/" + transfer.cle_publique + ".pem"


        https.get(urlKey, (res) => {
            const file = fs.createWriteStream(`./temp/received_key`);
            res.pipe(file);

            file.on('finish', () => {
                file.close();
                console.log(`Key downloaded!`);

                https.get(urlSign, (res) => {
                    const file = fs.createWriteStream(`./temp/received_sign`);
                    res.pipe(file);


                    file.on('finish', () => {
                        file.close();
                        console.log(`Signature downloaded!`);

                        https.get(urlPub, (res) => {
                            const file = fs.createWriteStream(`./temp/received_pub`);
                            res.pipe(file);

                            file.on('finish', () => {
                                file.close();
                                console.log(`Stranger public key downloaded!`);

                                https.get(urlMess, (res) => {
                                    const file = fs.createWriteStream(`./temp/received_mess`);
                                    res.pipe(file);


                                    file.on('finish', () => {
                                        file.close();
                                        console.log(`File downloaded!`);

                                        const data = fs.readFileSync('./temp/received_key');
                                        const algorithmSign = "SHA256";

                                        let Public = fs.readFileSync('./temp/received_pub');
                                        let signatureLue = Buffer.from(fs.readFileSync('./temp/received_sign'));

                                        // Verifying signature using crypto.verify() function
                                        const isVerified = crypto.verify(algorithmSign, data, Public, signatureLue);

                                        // Printing the result
                                        if (isVerified) {
                                            const privateKey = fs.readFileSync('./keys/private.pem')

                                            //let key = "6c7e467c8fe130e2d96a37dfb57bd78a"
                                            const cryptedKey = fs.readFileSync('./temp/received_key');

                                            const decryptedData = crypto.privateDecrypt(
                                                {
                                                    key: privateKey,
                                                    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                                                    oaepHash: "sha256",
                                                },

                                                cryptedKey
                                            );

                                            fs.writeFileSync("./temp/decrypted_key", decryptedData.toString());

                                            const decryptedKey = fs.readFileSync('./temp/decrypted_key')

                                            let algorithm = "aes-256-cbc";
                                            let iv = Buffer.from("979843777c873b5a2060c2ad968a20d9", "hex");
                                            let encMess = fs.readFileSync("./temp/received_mess", { encoding: "hex" });

                                            fs.unlinkSync('./temp/received_mess')
                                            fs.unlinkSync('./temp/decrypted_key')
                                            fs.unlinkSync('./temp/received_key')

                                            let decipherMess = crypto.createDecipheriv(algorithm, decryptedKey, iv);
                                            let decMess = decipherMess.update(encMess, "hex", "hex") + decipherMess.final("hex");


                                            fs.writeFileSync("./temp/message.txt", decMess, "hex");
                                            let mess = fs.readFileSync("./temp/message.txt").toString()


                                            dispatch({ type: "SET_MESSAGE", payload: { message: mess } })
                                            fs.unlinkSync('./temp/message.txt')
                                        }
                                        else {
                                            alert(`La signature de cet utilisateur n'est pas bonne`)
                                        }

                                        fs.unlinkSync('./temp/received_pub')
                                        fs.unlinkSync('./temp/received_sign')

                                    });

                                }).on("error", (err) => {
                                    console.log("Error: ", err.message);
                                });


                            });

                        }).on("error", (err) => {
                            console.log("Error: ", err.message);
                        });
                    });

                }).on("error", (err) => {
                    console.log("Error: ", err.message);
                });

            });

        }).on("error", (err) => {
            console.log("Error: ", err.message);
        });




    }

    const download = async () => {

        let urlFile = "http://18.233.162.213:3001/silver-cipher/data/enc_files/" + transfer.path_fich_crypt
        let urlKey = "http://18.233.162.213:3001/silver-cipher/data/enc_keys/" + transfer.path_cle_crypt
        let urlSign = "http://18.233.162.213:3001/silver-cipher/data/enc_signs/" + transfer.path_sign
        let urlPub = "http://18.233.162.213:3001/silver-cipher/data/public_keys/" + transfer.cle_publique + ".pem"


        https.get(urlFile, (res) => {
            const file = fs.createWriteStream(`./temp/received_file`);
            res.pipe(file);

            file.on('finish', () => {
                file.close();
                console.log(`File downloaded!`);

                https.get(urlKey, (res) => {
                    const file = fs.createWriteStream(`./temp/received_key`);
                    res.pipe(file);

                    file.on('finish', () => {

                        file.close();
                        console.log(`Key downloaded!`);

                        https.get(urlSign, (res) => {
                            const file = fs.createWriteStream(`./temp/received_sign`);
                            res.pipe(file);


                            file.on('finish', () => {
                                file.close();
                                console.log(`Signature downloaded!`);

                                https.get(urlPub, (res) => {
                                    const file = fs.createWriteStream(`./temp/received_pub`);
                                    res.pipe(file);

                                    file.on('finish', () => {
                                        file.close();
                                        console.log(`Stranger public key downloaded!`);

                                        const data = fs.readFileSync('./temp/received_key');
                                        const algorithmSign = "SHA256";

                                        let Public = fs.readFileSync('./temp/received_pub');
                                        let signatureLue = Buffer.from(fs.readFileSync('./temp/received_sign'));

                                        // Verifying signature using crypto.verify() function
                                        const isVerified = crypto.verify(algorithmSign, data, Public, signatureLue);

                                        if (isVerified) {

                                            const privateKey = fs.readFileSync('./keys/private.pem')

                                            const cryptedKey = fs.readFileSync('./temp/received_key');

                                            const decryptedData = crypto.privateDecrypt(
                                                {
                                                    key: privateKey,
                                                    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                                                    oaepHash: "sha256",
                                                },

                                                cryptedKey
                                            );

                                            fs.writeFileSync("./temp/decrypted_key", decryptedData.toString());

                                            const decryptedKey = fs.readFileSync('./temp/decrypted_key')

                                            let algorithm = "aes-256-cbc";
                                            let iv = Buffer.from("979843777c873b5a2060c2ad968a20d9", "hex");
                                            let encFile = fs.readFileSync("./temp/received_file", { encoding: "hex" });

                                            let decipherFile = crypto.createDecipheriv(algorithm, decryptedKey, iv);

                                            let decFile = decipherFile.update(encFile, "hex", "hex") + decipherFile.final("hex");

                                            let extension = transfer.path_fich_crypt.split('.')[1]
                                            let destination = "./downloads/Transfer_from_" + transfer.pseudo + "_on_" + transfer.date.split('T')[0]; // + "." + extension;

                                            var destinationToTest = destination + "." + extension;
                                            var i=0;

                                            while(fs.existsSync(destinationToTest)){
                                                i += 1;
                                                destinationToTest = destination +"_("+ i + ")." + extension;
                                            }

                                            fs.writeFileSync(destinationToTest, decFile, "hex");

                                            fs.unlinkSync('./temp/received_file')
                                            fs.unlinkSync('./temp/decrypted_key')
                                            fs.unlinkSync('./temp/received_key')
                                        }
                                        else {
                                            alert(`La signature de cet utilisateur n'est pas bonne`)
                                        }

                                        fs.unlinkSync('./temp/received_pub')
                                        fs.unlinkSync('./temp/received_sign')

                                    });

                                }).on("error", (err) => {
                                    console.log("Error: ", err.message);
                                });

                            });

                        }).on("error", (err) => {
                            console.log("Error: ", err.message);
                        });


                    });

                }).on("error", (err) => {
                    console.log("Error: ", err.message);
                });

            });

        }).on("error", (err) => {
            console.log("Error: ", err.message);
        });

    }

    if (transfer.date) {
        var dateTotale = transfer.date.split('T');
        var date = dateTotale[0];
        var horairereTotal = dateTotale[1].split('.');
        var horaire = horairereTotal[0].split(':')
        var heure = Number(horaire[0]) + 4;

        var trueHour = heure + ':' + horaire[1] + ':' + horaire[2]
        const deleteTransfer = async () => {
            await axios.post("http://18.233.162.213:3001/api/transferDeleteTest", { id: transfer.idTransfer }).then((response) => {
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
                    <button className="verify" onClick={() => verify()}>V&#xE9;rifier</button>
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