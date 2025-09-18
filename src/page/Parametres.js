import React from 'react';
import { useNavigate } from 'react-router-dom';
import ToggleButton from '../composant/ToggleButon';

const Params = () => {
    const navigate = useNavigate();
    const content = [
        {
            buttons: [
                { label: 'Chien', onClick: () => alert('Oui cliqué'), active: false },
                { label: 'Chat', onClick: () => alert('Non cliqué'), active: true },
            ],
        }
    ];

    const content2 = [
        {
            text: "J'aimerai un(e)",
            buttons: [
                { label: 'Mâle', onClick: () => alert('Oui cliqué'), active: false },
                { label: 'Femelle', onClick: () => alert('Non cliqué'), active: true },
            ],
        },
        {
            text: "Son âge",
            buttons: [
                { label: 'Jeune', onClick: () => alert('Oui cliqué'), active: false },
                { label: 'Adulte', onClick: () => alert('Non cliqué'), active: true },
                { label: 'Senior', onClick: () => alert('Non cliqué'), active: true },
            ],
        }
    ];

    const headerProfileStyle = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    };

    const spanStyle = {
        fontSize: '2rem',
        color: 'white',
    };

    return (
        <div>
            <div className='header-profile' style={headerProfileStyle}>
                <span onClick={() => navigate('/animals')} style={spanStyle}>←</span>
                <h1>Paramètres</h1>
            </div>
            <ToggleButton label="Qui as-tu envie d'adopter ?" content={content} />
            <ToggleButton label="Caractéristiques du chien à adopter" content={content2} />
            <ToggleButton label="Caractéristiques du chat à adopter" content={content2} />
        </div>
    );
}

export default Params;