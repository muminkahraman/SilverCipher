import React from "react"
import "../App.css"

import { HashRouter as Router, Route } from 'react-router-dom'
import { Link } from "react-router-dom"

import Recept from "./recept"
import Brouillon from "./brouillon"
import Navbar from "./navbar"
import Params from "./params"
import Envoi from "./envoi"
import New from "./new"
import ReceivedMessage from "./receivedMessage"
import ChangePass from './changePass'

import paramIcon from '../logos/param.svg'
import Logo from '../logos/Logo.svg'

import { useStateValue } from '../state/StateProvider';





export default function Menu() {

  const [{ username }] = useStateValue();
  
  const colorNav = (paramId) => {

    const recept = document.getElementById('recept')
    if (recept) {
      recept.style.backgroundColor = '#580aa5';
      recept.style.color = 'white';
    }
    const envoi = document.getElementById('envoi')
    if (envoi) {
      envoi.style.backgroundColor = '#580aa5';
      envoi.style.color = 'white';
    }
    const brouillon = document.getElementById('brouillon')
    if (brouillon) {
      brouillon.style.backgroundColor = '#580aa5';
      brouillon.style.color = 'white';
    }
    const blank = document.getElementById(paramId)
    if (blank) {
      blank.style.backgroundColor = 'white';
      blank.style.color = 'black';
    }

  }

  return (

    <>
      <div id="root" className='root'>
        <Router>
          <img className="logo" src={Logo} alt='' />
          <div className='name'> {username} </div>
          <Link className='param' to="/menu/params">
            <img className="paramIcon" src={paramIcon} alt='' onClick={() => colorNav()} />
          </Link>
          <Navbar className="navbar" />
          <div className='main'>
            <main>
              <Route exact path="/menu/recept" component={Recept} />
              <Route path="/menu/params" component={Params} />
              <Route path="/menu/envoi" component={Envoi} />
              <Route path="/menu/brouillon" component={Brouillon} />
              <Route path="/menu/new" component={New} />
              <Route path="/menu/receivedmessage" component={ReceivedMessage} />
              <Route path="/menu/changepass" component={ChangePass} />

            </main>
          </div>
        </Router>
      </div>
    </>
  )
}
