import React from 'react';
import { useNavigate } from 'react-router-dom';

const BtnDeco = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Suppression du jeton JWT
    navigate('/login'); // Redirection vers la page de connexion
  };

  return (
    <nav>
      <button className='NavButton' onClick={handleLogout}>Déconnexion</button>
    </nav>
  );
};

export default BtnDeco;
