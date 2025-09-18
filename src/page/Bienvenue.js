import { Children } from "react";
import Logo from "../composant/Logo"
import NavButton from "../composant/NavButton";

const Bienvenue = () => {
    return(
        <div className="container">
            <h1><strong>Bienvenue sur</strong></h1>
            <Logo/>
            <h2>Quelques règles pour commencer :</h2>
            <div>
            <h3>Je recherche un animal</h3>
            <ul>
                <li>Fournis des informations exactes et vraies sur ta situation </li>
                <li>Garde ton compte sécurisé et des identifiants de connexion confidentiels</li>
                <li>Sois toujours respectueux et courtois avec les autres utilisateurs.</li>
            </ul>
            <h3>Je recherche un adoptant : </h3>

                <ul>
                    <li>Les informations dans les annonces doivent être exactes et complète. Ne falsifie rien.</li>
                    <li>Les photos de tes animaux doivent être récentes et représentatives. Pas de retouches trompeuses</li>
                    <li>Sois transparent sur le santé et l'historique médical de ton animal.</li>
                    <li>Mets à jour les informations sur tes animaux régulièrement.</li>
                    <li>Ne publie pas d'annonces pour des animaux illégaux à posséder, vendre ou adopter.</li>
                </ul>
            </div>
            <p>Tu peux signaler tout comportement abusif, annonce frauduleuse ou violation des règles via les fonctionnalités de signalement</p>
            <NavButton to="/choix">J'accepte</NavButton >
        </div>
    )
}

export default Bienvenue;