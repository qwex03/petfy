import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';  // Importation de BrowserRouter
import App from './router/App';
import "./index.css";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>  
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Si tu veux commencer à mesurer les performances de ton app, passe une fonction
// pour enregistrer les résultats (par exemple : reportWebVitals(console.log))
// ou envoie-les à un endpoint d'analyse. En savoir plus : https://bit.ly/CRA-vitals
reportWebVitals();
