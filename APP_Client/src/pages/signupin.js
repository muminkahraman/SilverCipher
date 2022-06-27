import React from "react"
import "../App.css"
import { Link } from "react-router-dom"

const Sign = () => {
    return (
        <>
        <h2>Inscrivez/connectez vous</h2>
    <div className="container" id="container">
        <div className="form-container sign-up-container">
            <form action="#">
                <h1>Créer un compte</h1>
                <input type="text" placeholder="Pseudo" />
                <input type="email" placeholder="Email" />
                <input type="tel" placeholder="Téléphone" />
                <input type="password" placeholder="Mot de passe" />
                
                <button>Inscrivez vous</button>
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
                    <p>Si vous avez déjà un compte</p>
                    <button className="ghost" id="signIn" onClick={() => document.getElementById('container').classList.remove('right-panel-active')}>Connectez vous</button>
                </div>
                <div className="overlay-panel overlay-right">
                    <h1>Bonjour chère utilisateur!</h1>
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