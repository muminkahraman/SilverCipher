import React from 'react';
import { Link } from "react-router-dom"
import '../App.css';
const script = require('../script')

function Navbar() {
  return (
    <>
      <div className="navbar">
        <div className='navItems'>
          <Link to="/" id="recept" onClick={ () => script.colorNav('recept') }>Boite de reception</Link>
          <Link to="/envoi" id="envoi" onClick={ () => script.colorNav('envoi')}>Boite d'envoi</Link>
          <Link to="/brouillon" id="brouillon" onClick={ () => script.colorNav('brouillon')}>Brouillon</Link>
          <Link className="new" to="/new" onClick={ () => script.colorNav() }>Nouveau message</Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
