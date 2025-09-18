import React, { useState } from 'react';
import Navbar from '../composant/Navbar';
import './Premium.css';

const animals = [
  { id: 1, name: "Rex", type: "Chien", image: "/images/rex.jpg" },
  { id: 2, name: "Mia", type: "Chat", image: "/images/mia.jpg" },
  { id: 3, name: "Luna", type: "Chien", image: "/images/luna.jpg" },
];

const PremiumPage = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = () => {
    setIsSubscribed(true);
  };

  return (
    <div className="premium-page">
      <h1>Bienvenue dans l'option Premium</h1>
      <p>Accédez à plus d'animaux, des fonctionnalités exclusives et des rencontres illimitées avec l'option Premium.</p>

      <div className="animal-cards">
        {animals.map((animal) => (
          <div key={animal.id} className="card">
            <img src={animal.image} alt={animal.name} className="card-img" />
            <div className="card-content">
              <h3>{animal.name}</h3>
              <p>{animal.type}</p>
              <button className="card-btn">Rencontrer</button>
            </div>
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: '20px' }}>Abonnez-vous pour 5€/mois</h2>
      <p>Devenez membre Premium pour débloquer toutes les fonctionnalités de notre application.</p>

      <button
        onClick={handleSubscribe}
        disabled={isSubscribed}
        className="subscribe-btn"
      >
        {isSubscribed ? 'Abonnement Actif' : 'S\'abonner pour 5€/mois'}
      </button>

      {isSubscribed && (
        <div style={{ marginTop: '20px' }}>
          <h3>Merci pour votre abonnement Premium !</h3>
          <p>Vous pouvez maintenant profiter de toutes les fonctionnalités exclusives de l'application.</p>
        </div>
      )}
    <Navbar/>
    </div>
  );
};

export default PremiumPage;
