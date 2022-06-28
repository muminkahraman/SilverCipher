import React from 'react';
import { Link } from "react-router-dom"
import '../App.css';

function Navbar() {
  
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
      <div className="navbar">
        <div className='navItems'>
          <Link to="/menu/recept" id="recept" onClick={ () => colorNav('recept') }>Boite de reception</Link>
          <Link to="/menu/envoi" id="envoi" onClick={ () => colorNav('envoi')}>Boite d'envoi</Link>
          <Link to="/menu/brouillon" id="brouillon" onClick={ () => colorNav('brouillon')}>Brouillon</Link>
          <Link className="new" to="/menu/new" onClick={ () => colorNav() }>Nouveau message</Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
