import React from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Navigate, useNavigate } from 'react-router-dom';
import Logo from "../composant/Logo";
import Form from "../composant/Form";

const Login = () => {
  let navigate = useNavigate();
  const handleSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: data.email,
        password: data.password,
      });

      localStorage.setItem("token", res.data.token);
      const token = localStorage.getItem("token");
      if (!token) {
          console.error("Token introuvable !");
          return;
      }

      const decoded = jwtDecode(token);
      const userId = decoded.id;
      const userRole = decoded.role;
      if(userRole == "adoptant") {
        navigate("/animals")
      } else {
        navigate("/dashboard")
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert("Une erreur est survenue. Veuillez réessayer.");
      }
    }
  };

  const fields = [
    { name: "email", type: "email", label: "Email", placeholder: "Entrez votre email", titre: "" },
    { name: "password", type: "password", label: "Mot de passe", placeholder: "Entrez votre mot de passe", titre: "" },
  ];

  return (
    <div className="container">
      <Logo />
      <div>
      <h2>Connexion</h2>
      <Form
        fields={fields}
        onSubmit={handleSubmit}
        submitUrl={null} 
      />
      </div>
    </div>
  );
};

export default Login;
