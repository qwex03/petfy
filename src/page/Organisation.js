import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import Form from '../composant/Form'; 
import Logo from '../composant/Logo';

const Organisation = () => {
  const [message, setMessage] = useState("");
  const [isReviewing, setIsReviewing] = useState(false); 
  let navigate = useNavigate();

  const token = localStorage.getItem("token");
  if (!token) {
      console.error("Token introuvable !");
      return;
  }

  const decoded = jwtDecode(token);
  const userId = decoded.id;
  console.log(userId)

  const fields = [
    {
      name: "name",
      label: "Nom",
      type: "text",
      placeholder: "Nom de l'organisation",
      titre: "Quel est le nom de ton organisation"
    },
    {
      name: "date",
      label: "Date",
      type: "number",
      placeholder: "Date de création de l'organisation",
      length: 8,
      titre: "Quelle est la date de création de ton organisation ?"
    },
    {
      name: "siret",
      label: "Siret",
      type: "text",
      placeholder: "N° de SIRET",
      titre: "N° de SIRET"
    }, 
    {
      titre: "Vérifier les informations", 
      type: "validation"
    }
  ];



  const handleSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/api/orga/create", {
        nom: data.name,
        siret: data.siret,
        date: data.date,
        userId: userId
      });

      navigate("/ajout-animal");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert("Une erreur est survenue. Veuillez réessayer.");
      }
    }
  };

  return (
    <div>
      <Logo />
      {message && <p>{message}</p>}
      <div>
        <h3>Inscrire ton organisation</h3>
        <Form 
          fields={fields} 
          onSubmit={handleSubmit}
          isReview={true}
        />
      </div>
    </div>
  );
};

export default Organisation;
