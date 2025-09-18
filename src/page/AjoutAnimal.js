import React, { useState, useEffect } from "react";
import MultiStepDisplay from "../composant/MultiStep";
import Liste from "../composant/Select";
import InputImage from "../composant/InputImage";
import ChoixButton from "../composant/ChoixButton";
import TextArea from "../composant/TextArea";
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Ajout = () => {
    const [userId, setUserId] = useState(null);
    const [tokenError, setTokenError] = useState(false);
    const [formData, setFormData] = useState({
        animalType: "",
        gender: "",
        euthanasia: "",
        preferences: {
            dog: false,
            cat: false,
            kids: false,
            others: false,
        },
        name: "",
        animalAge: "",
        description: "",
        imageUrl: "",  
    });

    let navigate = useNavigate();

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

    const handleNameChange = (name) => {
        setFormData((prev) => ({ ...prev, name }));
    };

    const handleAnimalAgeChange = (animalAge) => {
        setFormData((prev) => ({ ...prev, animalAge }));
    };

    const handleDescriptionChange = (description) => {
        setFormData((prev) => ({ ...prev, description }));
    };

    const handleImageChange = (newUrl) => {
        setFormData((prev) => ({
            ...prev,
            imageUrl: newUrl,
        }));
    };

    const handleSubmit = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/orga/add-animal/' + userId, {
                animalType: formData.animalType,
                gender: formData.gender,
                euthanasia: formData.euthanasia,
                preferences: formData.preferences,
                name: formData.name,
                animalAge: formData.animalAge,
                description: formData.description,
                imageUrl: formData.imageUrl, 
            });
            navigate("/dashboard");
            console.log('Animal ajouté avec succès', res.data);
        } catch (error) {
            console.error(error.response ? error.response.data.message : error.message);
            console.log(formData, userId);
        }
    };

    return (
        <div>
            <h1>Ajout d'un animal</h1>
            <MultiStepDisplay
                components={[
                    <Liste value={formData.animalType} onChange={handleListeChange} role={""} />,
                    <ChoixButton formData={formData} onFormDataChange={handleChoixButtonChange} role="admin" />,
                    <InputImage onImageChange={handleImageChange} />, 
                    <TextArea
                        nameValue={formData.name}
                        ageValue={formData.animalAge}
                        descValue={formData.description}
                        onNameChange={handleNameChange}
                        onAgeChange={handleAnimalAgeChange}
                        onDescChange={handleDescriptionChange}
                    />,
                ]}
                handleSubmit={handleSubmit}
            />
        </div>
    );
};

export default Ajout;
