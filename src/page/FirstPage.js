// FirstPage.js
import React from 'react';
import NavButton from '../composant/NavButton';
import Logo from '../composant/Logo';

function FirstPage() {
  return (
    <div className='container'>
      <Logo/>
      <h1>Prêt à <strong>rencontrer</strong> ton nouveau compagnon de vie ?</h1>
      <div>
        <NavButton to="/register">Créer un compte</NavButton>
        <NavButton to="/login">Connexion</NavButton>
      </div>
    </div>
  );
}

export default FirstPage;

