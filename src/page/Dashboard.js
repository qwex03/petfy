import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Header from "../composant/header";
import Navbar from "../composant/Navbar";

const Dashboard = () => {
    const [orga, setOrga] = useState(null);
    const [userId, setUserId] = useState(null);
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

    useEffect(() => {
        if (!userId) return;

        const fetchOrga = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/orga/dashboard/${userId}`);
                if (!response.ok) {
                    alert("Erreur lors de la récupération des données !");
                    return;
                }
                const data = await response.json();
                setOrga(data);
                console.log(data);
            } catch (err) {
                alert("Erreur de connexion : " + err);
            }
        };

        fetchOrga();
    }, [userId]);

    if (!orga) {
        return (
            <div>
                <Header />
                <h1>Chargement...</h1> 
                <Navbar />
            </div>
        );
    }

    return (
        <div>
            <Header />
            <h1>Bonjour {orga.organisationName}</h1> 
            <p>Fais certifier ton compte</p>
            <h2>Mes animaux</h2>
            <ul className="list">
                {orga.animals.map((animal, index) => (
                    <li key={index}>
                        <img src={animal.imageUrl} alt={animal.name} />
                        <p>{animal.name}</p>
                    </li>
                ))}
                <li><Link to="/ajout-animal">Ajouter un animal</Link></li>
            </ul>
            <Navbar />
        </div>
    );
};

export default Dashboard;
