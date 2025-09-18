import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Input from '../composant/input';
import InputNumber from '../composant/inputNumber';
import { jwtDecode } from "jwt-decode";
import Navbar from '../composant/Navbar';
import ToggleButton from '../composant/ToggleButon';
import BtnDeco from '../composant/BtnDeco';

const UpdateUser = () => {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [birth, setBirth] = useState(['', '', '', '']); 
  const [message, setMessage] = useState('');
  const [tokenError, setTokenError] = useState(false);
  
  

  useEffect(() => {
          const token = localStorage.getItem("token");
          if (!token) {
              console.error("Token introuvable !");
              setTokenError(true);
              return;
          }
  
          try {
              const decoded = jwtDecode(token);
              setUserId(decoded.id);
          } catch (error) {
              console.error("Erreur lors du décodage du token", error);
              setTokenError(true);
          }
      }, []);

  const handleBirthChange = (values) => {
    setBirth(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const birthString = birth.join(''); 
    if (!userId || !name || birthString.length !== 8) {
      setMessage('Veuillez remplir tous les champs.');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/auth/change/${userId}`, {
        name,
        birth: birthString,
      });

      setMessage(`Utilisateur mis à jour : ${response.data.name}, né le ${response.data.birth}`);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message || 'Erreur lors de la mise à jour.');
      } else {
        setMessage('Erreur serveur.');
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Mon Profil</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <Input
            type="text"
            placeholder="Entrer le nom"
            label="Nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Date de naissance :</label>
          <InputNumber
            length={8} 
            values={birth}
            onChange={handleBirthChange}
          />
        </div>
        <button className='NavButton' type="submit" style={{ marginTop: '20px' }}>
          Mettre à jour
        </button>
      </form>

      <ToggleButton label="Je possède déjà un animal de compagnie" content={ [
        {
            buttons: [
                { label: 'Oui', onClick: () => alert('Oui cliqué'), active: false },
                { label: 'Non', onClick: () => alert('Non cliqué'), active: true },
            ],
        }
      ]}/>
      <ToggleButton label="J'ai des enfants" content={ [
        {
            buttons: [
                { label: 'Oui', onClick: () => alert('Oui cliqué'), active: false },
                { label: 'Non', onClick: () => alert('Non cliqué'), active: true },
            ],
        }
      ]}/>
      {message && <p>{message}</p>}
      <BtnDeco />
      <Navbar />
    </div>
  );
};

export default UpdateUser;
