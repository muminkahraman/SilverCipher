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
import paramIcon from '../logos/param.svg'
import Logo from '../logos/Logo.svg'

const script = require('../script')

export default function Menu() {

  return (
    <>
    
      <div id="root" className='root'>
        <Router>
            <img className="logo" src={Logo} alt='' />
            <div className='name'>Sébastien THOUVENIN</div>
            <Link className='param' to="/params">
                <img className="paramIcon" src={paramIcon} alt='' onClick={ script.colorNav }/>
            </Link>
            <Navbar className="navbar" />
            <div className='main'>
                <main>
                    <Route exact path="/" component={Recept} />
                    <Route path="/params" component={Params} />
                    <Route path="/envoi" component={Envoi} />
                    <Route path="/brouillon" component={Brouillon} />
                    <Route path="/new" component={New} />
                </main>
            </div>
        </Router>
    </div>
    </>
  )
}
