

import React from "react"
import "../App.css"
import { Link } from "react-router-dom"
import script from '../script'

const Sign = () => {
    return (
        <>
        <h2>Inscrivez/connectez vous</h2>
    <div className="container" id="container">
        <div className="form-container sign-up-container">
            <form action="#">
                <h1>Cr�er un compte</h1>
                <input type="text" id="pseudo" placeholder="Pseudo" />
                <input type="email" id="email" placeholder="Email" />
                <input type="tel" id="tel" placeholder="T�l�phone" />
                <input type="password" id="password" placeholder="Mot de passe" />
                
                <button onClick={() => {
                  script.creeStore(
                  document.getElementById("pseudo").value,
                  document.getElementById("email").value,
                  document.getElementById("tel").value,
                  document.getElementById("password").value
                  
                )
                console.log(document.getElementById("pseudo").value)
                script.getUsers();

                }}>Inscrivez vous</button>
            </form>
        </div>
        <div className="form-container sign-in-container">
            <form action="#">
                <h1>Connectez vous</h1>
                <input type="password" placeholder="Mot de passe" />
                <button>Se connecter</button>
            </form>
        </div>
        <div className="overlay-container">
            <div className="overlay">
                <div className="overlay-panel overlay-left">
                    <h1>Bienvenue!</h1>
                    <p>Si vous avez d�j� un compte</p>
                    <button className="ghost" id="signIn" onClick={() => document.getElementById('container').classList.remove('right-panel-active')}>Connectez vous</button>
                </div>
                <div className="overlay-panel overlay-right">
                    <h1>Bonjour ch�re utilisateur!</h1>
                    <p>Entrez vos informations pour pouvoir commencer!</p>
                    <button className="ghost" id="signUp" onClick={() => document.getElementById('container').classList.add('right-panel-active')}>Inscrivez vous</button>
                </div>
            </div>
        </div>
    </div>
    <Link to="/verify" >Go to menu</Link>

        </>
    )
}

export default Sign;
