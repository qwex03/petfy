import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const AnimalDetails = () => {
    const { id } = useParams();
    const [animal, setAnimal] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnimal = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/animals/${id}`);
                setAnimal(res.data.animal);
                console.log(res.data.animal);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchAnimal();
    }, [id]);

    if (error) {
        return <div style={{ color: 'red', textAlign: 'center' }}>Error: {error}</div>;
    }

    if (!animal) {
        return <div style={{ textAlign: 'center' }}>Loading...</div>;
    }

    return (
        <div style={styles.container}>
            <div style={styles.imageContainer}>
                <Link to="/animals" style={styles.backArrow}>&larr;</Link>
                <img src={animal.imageUrl} alt={animal.name} style={styles.image} />
            </div>
            <h1 style={styles.name}>{animal.name}</h1>
            <div style={styles.detailsContainer}>
                <div style={styles.detailBox}>
                    <span style={styles.label}>Sexe: </span>
                    <span style={styles.value}>{animal.gender}</span>
                </div>
                <div style={styles.detailBox}>
                    <span style={styles.label}>Âge: </span>
                    <span style={styles.value}>{animal.animalAge}</span>
                </div>
                <div style={styles.detailBox}>
                    <span style={styles.label}>Race: </span>
                    <span style={styles.value}>{animal.name}</span>
                </div>
            </div>
            <h2 style={styles.subtitle}>À propos de {animal.name}</h2>
            <p style={styles.description}>{animal.description}</p>
            <div style={styles.detailsContainer}>
            {Object.entries(animal.preferences)
            .filter(([key, value]) => value) 
            .map(([key], index) => (
                <span key={index} className="preference">
                {key} OK
                </span>
            ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        maxWidth: '600px',
        margin: '0 auto',
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        maxWidth: '600px',
    },
    image: {
        width: '100%',
        height: 'auto',
        objectFit: 'cover',
        border: '5px solid blue',
        borderRadius: '10px',
        marginBottom: '20px',
    },
    backArrow: {
        position: 'absolute',
        top: '10px',
        left: '10px',
        color: 'white',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: '10px',
        borderRadius: '50%',
        textDecoration: 'none',
        fontSize: '20px',
        zIndex: 10,
    },
    name: {
        color: 'white',
        fontSize: '2rem',
        marginBottom: '20px',
        textAlign: 'center',
        width: '100%',
    },
    detailsContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: '20px',
        marginBottom: '20px',
        justifyContent: 'center',
        width: '100%',
    },
    detailBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '2px solid brown',
        padding: '10px',
        borderRadius: '5px',
        flex: '1',
        height: "100px",
        maxWidth: '150px',
    },
    label: {
        fontWeight: 'bold',
        marginBottom: '5px',
        color: 'white',
    },
    value: {
        color: 'white',
    },
    subtitle: {
        color: 'white',
        fontSize: '1.5rem',
        marginBottom: '10px',
    },
    description: {
        textAlign: 'left',
        lineHeight: '1.5',
        maxWidth: '600px',
        color: 'white',
    },
};

export default AnimalDetails;
