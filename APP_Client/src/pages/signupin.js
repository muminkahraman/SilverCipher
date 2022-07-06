import React, { useState } from "react"
import "../App.css"
import { Link } from "react-router-dom"
import { useStateValue } from '../state/StateProvider';

const app = window.require('electron').remote
const fs = app.require('fs')
const crypto = app.require('crypto')
const axios = app.require("axios");
const FormData = app.require('form-data');


const Sign = () => {

    const isNum = (val) => {
        return !isNaN(val)
    }

    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState('');
    const [pass, setPass] = useState('');
    const [cguAcc, setCguAcc] = useState(false);



    const [{ username, password }, dispatch] = useStateValue();

    const genRsa = () => {
        let { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
            // The standard secure default length for RSA keys is 2048 bits
            modulusLength: 2048,
        });

        const exportedPublicKeyBuffer = publicKey.export({
            type: "pkcs1",
            format: "pem",
        });
        fs.writeFileSync("./keys/public.pem", exportedPublicKeyBuffer, {
            encoding: "utf-8",
        });

        const exportedPrivateKeyBuffer = privateKey.export({
            type: "pkcs1",
            format: "pem",
        });
        fs.writeFileSync("./keys/private.pem", exportedPrivateKeyBuffer, {
            encoding: "utf-8",
        });
    };

    const creeUser = async (pseudo, mail, tel, pass) => {

        dispatch({
            type: "SET_USER", payload: {
                username: pseudo,
                email: mail,
                tel: tel,
                password: pass
            }
        })


        let user = {
            username: pseudo,
            email: mail,
            tel: tel,
            password: pass,
            repertoire: [],
            passwordAccepted: false,
            message: '',
        }

        let donnees = JSON.stringify(user)
        fs.writeFileSync('./src/state/user.json', donnees)

        let randomString1 = crypto.randomBytes(16).toString("hex");

        axios
            .post("http://18.233.162.213:3001/api/user", {
                pseudo: pseudo,
                mail: mail,
                tel: tel,
                cle_publique: randomString1,
                path_cert: "path_cert",
            })
            .then((response) => {
                console.log(response.data);
            });
        genRsa(randomString1);

        let form = new FormData();
        form.append(
            "file",
            fs.createReadStream("./keys/public.pem"),
            randomString1 + ".pem"
        );
        await axios
            .post("http://18.233.162.213:3001/api/upload/pub_key", form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                console.log(response.data);
            });
    }

    const testConnecte = () => {
        return username == null;
    }

    const signIn = (testPass) => {
        const assert = testPass === password;
        dispatch({ type: "SET_PASSWORD_ACCEPTED", payload: { passwordAccepted: assert } })
    }

    return (
        <div className="sign_body">
            <br></br>
            <div className="container" id="container">
                <div className="form-container sign-up-container">
                    <form>
                        {testConnecte() ?
                            <><h1>Cr&#xE9;er un compte</h1>
                                <input type="text" id="pseudo" placeholder="Pseudo" onChange={(e) => setPseudo(e.target.value)} />
                                <input type="email" id="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                                <input type="tel" id="tel" placeholder="T&#xE9;l&#xE9;phone" onChange={(e) => setTel(e.target.value)} />
                                <input type="password" id="password_up" placeholder="Mot de passe" onChange={(e) => setPass(e.target.value)} />
                                <div className="cguLine">
                                    <input className="cguCheck" type="checkbox" id="cgu" name="cgu" onClick={() => { setCguAcc(!cguAcc) }} />
                                    <div className="cguLabel">J'accepte les <a href="https://example.com" target="_blank" rel="noopener noreferrer">Conditions G&#xE9;n&#xE9;rales d'Utilisation</a> </div>
                                </div>
                                {(isNum(tel)
                                    && (tel.length === 10)
                                    && (email.indexOf('@') !== -1)
                                    && (pseudo.value !== "")
                                    && (cguAcc)
                                )
                                    ?
                                    <Link className="sign_link" to="/menu/recept" onClick={() => {
                                        creeUser(
                                            pseudo,
                                            email,
                                            tel,
                                            pass)
                                    }}> Inscrivez vous </Link>
                                    : <h3>Veuillez renseigner correctement tous les champs et accepter les CGU</h3>
                                }

                            </> :
                            <h1>Vous &ecirc;tes d&#xE9;j&#xE0; inscrits</h1>}

                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form>
                        {!testConnecte() ?
                            <>
                                <h1>Connectez vous {username}</h1>
                                <input type="password" placeholder="Mot de passe" id="password_in" />
                                <Link className="sign_link" to="/verify" onClick={() => signIn(document.getElementById("password_in").value)}> Connectez vous </Link>                        </> :
                            <h1>Veuillez vous inscrire</h1>
                        }
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Bienvenue!</h1>
                            <p>Si vous avez d&#xE9;j&#xE0; un compte</p>
                            <button className="ghost" id="signIn" onClick={() => document.getElementById('container').classList.remove('right-panel-active')}>Connectez vous</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Bonjour cher utilisateur!</h1>
                            <p>Entrez vos informations pour pouvoir commencer!</p>
                            <button className="ghost" id="signUp" onClick={() => document.getElementById('container').classList.add('right-panel-active')}>Inscrivez vous</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Sign;
