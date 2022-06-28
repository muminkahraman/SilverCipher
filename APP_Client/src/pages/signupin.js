import React from "react"
import "../App.css"
import { Link } from "react-router-dom"
import { useStateValue } from '../state/StateProvider';

const Sign = () => {

    const [{ username, password }, dispatch] = useStateValue();


    const creeUser = (pseudo, mail, tel, pass) => {

        dispatch({type: "SET_USER", payload: {
            username: pseudo,
            email: mail,
            tel: tel,
            password: pass,
            privateKey: '00'
        }})
    }

    const testConnecte = () => {
        return username == null;
    }

    const signIn = (testPass) => {
        const assert = testPass === password;
        dispatch({type: "SET_PASSWORD_ACCEPTED", payload: {passwordAccepted: assert }})
    }

    return (
        <div className="sign_body">
            <br></br>
            <div className="container" id="container">
                <div className="form-container sign-up-container">
                    <form action="#">
                        { testConnecte() ?
                            <><h1>Cr&#xE9;er un compte</h1>
                                <input type="text" id="pseudo" placeholder="Pseudo" />
                                <input type="email" id="email" placeholder="Email" />
                                <input type="tel" id="tel" placeholder="T&#xE9;l&#xE9;phone" />
                                <input type="password" id="password_up" placeholder="Mot de passe" />

                                <Link className="sign_link" to="/menu/recept" onClick={() => {
                                    creeUser(
                                        document.getElementById("pseudo").value,
                                        document.getElementById("email").value,
                                        document.getElementById("tel").value,
                                        document.getElementById("password_up").value)
                                }}> Inscrivez vous </Link>
                            </> :
                            <h1>Vous &ecirc;tes d&#xE9;j&#xE0; inscrits</h1>}

                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form action="#">
                        { !testConnecte() ?
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
