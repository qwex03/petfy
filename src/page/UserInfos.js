import React, { useState, useEffect } from "react";
import MultiStepDisplay from "../composant/MultiStep";
import GenderSelector from "../composant/UserSexe";
import UserNB from "../composant/UserNameBirth";
import Liste from "../composant/Select";
import Logo from "../composant/Logo";
import Slider from "../composant/Slider";
import { jwtDecode } from "jwt-decode";
import { Navigate, useNavigate } from 'react-router-dom';
import ChoixButton from "../composant/ChoixButton";
import axios from "axios";



const UserInfos = () => {
    let navigate = useNavigate();
    const [userId, setUserId] = useState(null);
    const [tokenError, setTokenError] = useState(false);

     const [formData, setFormData] = useState({
        animalType: "",
        gender: "",
        UserGender: "",
        euthanasia: "",
        preferences: {
          dog: false,
          cat: false,
          kids: false,
          others: false,
        },
        userAge: "",
        distance: 0,
      });
      

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


    const handleListeChange = (value) => {
        setFormData((prevData) => ({
        ...prevData,
        animalType: value,
        }));
    };
    
    const handleChoixButtonChange = (updatedFormData) => {
    setFormData(updatedFormData);
    };

    const handleSubmit = async () => {
        try {
            const res = await axios.post(`http://localhost:5000/api/user/preferences/${userId}`, {
                preferences: formData.preferences,
                animalType: formData.animalType,
                gender: formData.gender,
                euthanasia: formData.euthanasia,
                UserGender: formData.UserGender,
                birth: formData.userAge.join(""),
                distance: formData.distance,
            });
            navigate("/animals");
        } catch (error) {
            alert(error.response ? error.response.data.message : error.message);
            console.error(error.response ? error.response.data.message : error.message);
        }
    };

    return(
        <div>
            <Logo />
            <MultiStepDisplay components={[<UserNB value={{ name: formData.name, userAge: formData.userAge}}  onChange={(updatedValues) =>
            setFormData((prevData) => ({ ...prevData, ...updatedValues }))
            }/>, 
            <GenderSelector 
            value={formData.gender} 
            onChange={(newGender) =>
                setFormData((prevData) => ({ ...prevData, UserGender: newGender }))
            }
            />, 
            <Liste value={formData.animalType}  onChange={handleListeChange} role="adoptant" />, 
            <ChoixButton formData={formData} onFormDataChange={handleChoixButtonChange}/>, 
            <Slider value={formData.distance} onChange={(newDistance) =>
                setFormData((prevData) => ({ ...prevData, distance: newDistance }))
              }/>]} handleSubmit={handleSubmit} />
        </div>
    );
}

export default UserInfos;