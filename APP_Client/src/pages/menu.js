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
  
  const name = script.getName();

  return (
    <>
      <div id="root" className='root'>
        <Router>
          <img className="logo" src={Logo} alt='' />
          <div className='name'> {name} </div>
          <Link className='param' to="/menu/params">
            <img className="paramIcon" src={paramIcon} alt='' onClick={() => script.colorNav()} />
          </Link>
          <Navbar className="navbar" />
          <div className='main'>
            <main>
              <Route exact path="/menu/recept" component={Recept} />
              <Route path="/menu/params" component={Params} />
              <Route path="/menu/envoi" component={Envoi} />
              <Route path="/menu/brouillon" component={Brouillon} />
              <Route path="/menu/new" component={New} />
            </main>
          </div>
        </Router>
      </div>
    </>
  )
}
