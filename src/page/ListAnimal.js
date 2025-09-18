import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import AnimalCard from "../composant/AnimalCard";
import { Link } from 'react-router-dom';

const ListAnimals = () => {
  const [animals, setAnimals] = useState([]);
  const [userId, setUserId] = useState('');
  const [tokenError, setTokenError] = useState(false);
  useEffect(() => {

    const token = localStorage.getItem("token");
    if (!token) {
        console.error("Token introuvable !");
        setTokenError(true);
        return;
    }
    const decoded = jwtDecode(token);
    setUserId(decoded.id);

    axios
      .get(`http://localhost:5000/api/user/unrated-animals/${decoded.id}`)
      .then((response) => {
        setAnimals(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the animals!", error);
      });
  }, []);

  const ldAnimal = async (animalId, userId, type) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/animals/${type}/${animalId}`, {
       userId: userId
      });
    } catch(err) {
      console.error(err);
      throw err;
    }
  }

  const handleSwipe = async (direction, id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token non trouvé");
  
      const decoded = jwtDecode(token);
      const userId = decoded.id;
  
      if (direction === "left") {
        await ldAnimal(id, userId, "dislike");
      } else {
        await ldAnimal(id, userId, "like");
      }
  
      setAnimals((prevAnimals) => prevAnimals.filter((animal) => animal._id !== id));
    } catch (err) {
      console.error("Erreur dans handleSwipe :", err);
      alert("Une erreur s'est produite. Veuillez réessayer.");
    }
  };
  

  return (
    <div className="animal-list">
      {animals.map((animal) => (
        <Link to={`/animal/${animal._id}`}>
          <AnimalCard key={animal._id} {...animal} onSwipe={(dir) => handleSwipe(dir, animal._id)} />
        </Link>
      ))}
    </div>
  );
};
export default ListAnimals;
