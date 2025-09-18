import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Navbar from '../composant/Navbar';
import { Link } from "react-router-dom";


const Conv = ({ userId }) => {
  const [likedAnimals, setLikedAnimals] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token introuvable !");
      return;
    }
    const decoded = jwtDecode(token);
    const userId = decoded.id;
    const userRole = decoded.role;

    if (userRole == "adoptant") {
      fetch(`http://localhost:5000/api/user/liked-animals/${userId}`)
      .then((response) => response.json())
      .then((data) => setLikedAnimals(data));
    } else {
      fetch(`http://localhost:5000/api/orga/user/${userId}/animals-liked`)
      .then((response) => response.json())
      .then((data) => setLikedAnimals(data));
    }
  }, [userId]);

  const redirectToAnimalChat = (animalId) => {
    window.location.href = `/chat/${animalId}`;
  };

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      padding: '20px',
    },
    title: {
      fontSize: '24px',
      color: '#333',
      marginBottom: '20px',
    },
    animalList: {
      listStyleType: 'none',
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    animalItem: {
      margin: '10px 0',
      fontSize: '20px',
      color: '#007BFF',
      cursor: 'pointer',
      textDecoration: 'none',
    },
    animalItemHover: {
      textDecoration: 'underline',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Animaux aimés</h2>
      <ul style={styles.animalList}>
        {likedAnimals.map((animal) => (
          <Link to={`/chat/${animal._id}`}>
            <li
              key={animal._id}
              style={styles.animalItem}
            >
              {animal.name}
            </li>
          </Link>
        ))}
      </ul>
      <Navbar />
    </div>
  );
};

export default Conv;
