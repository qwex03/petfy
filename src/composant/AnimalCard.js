import React from "react";
import TinderCard from "react-tinder-card";
import { Link } from 'react-router-dom';
import "./css/AnimalCard.css"

const AnimalCard = ({ name, age, race, imageUrl, onSwipe }) => {
    return (
        <TinderCard onSwipe={onSwipe}>
            <div className="animal-card" style={{ backgroundImage: `url(${imageUrl})` }}>
                <div className="info">
                    <h3>{name}</h3>
                    <p>{race}</p>
                    <p>{age} ans</p>
                </div>
            </div>
        </TinderCard>
    );
};

export default AnimalCard;
