import { jwtDecode } from "jwt-decode";
import { Navigate, useNavigate } from 'react-router-dom';
import Logo from "../composant/Logo";

const Choix = () => {
    let navigate = useNavigate();
    const assignRole = async (role) => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Token introuvable !");
            return;
        }

        try {
            const decoded = jwtDecode(token);
            const userId = decoded.id;

            const response = await fetch(`http://localhost:5000/api/auth/assign-role/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ role }), 
            });

            if (!response.ok) {
                throw new Error(`Erreur API : ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Rôle attribué avec succès :", data);
            if(role == "organisme") {
                navigate("/organisation")
            } else {
                navigate("/user-info")
            }
        } catch (error) {
            console.error("Erreur lors de l'attribution du rôle :", error);
            alert("Erreur lors de l'attribution du rôle. Veuillez réessayer.");
        }
    };

    return (
        <div className="container">
            <Logo />
            <div>
                <button className="NavButton" onClick={() => assignRole("organisme")}>
                    Je cherche à faire adopter mon animal
                </button>
                <button className="NavButton" onClick={() => assignRole("adoptant")}>
                    Je veux trouver un animal à l'adoption
                </button>
            </div>
        </div>
    );
};

export default Choix;
