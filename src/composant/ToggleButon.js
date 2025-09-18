import React, { useState } from 'react';

const ToggleButton = ({ label, content }) => {
    const [visible, setVisible] = useState(true);
    const [contentState, setContentState] = useState(content || []);

    const toggleActiveButton = (rowIndex, buttonIndex) => {
        const newContent = [...contentState];
        newContent[rowIndex].buttons = newContent[rowIndex].buttons.map((button, idx) => ({
            ...button,
            active: idx === buttonIndex, 
        }));
        setContentState(newContent); 
    };

    return (
        <div className='toggle-container'>
            <div className='toggle-label' onClick={() => setVisible(!visible)} style={{ cursor: 'pointer' }}>
                {label} {visible ? '▲' : '▼'}
            </div>
            {visible && (
                <div className='toggle-content'>
                    {contentState.length > 0 ? (
                        contentState.map((item, rowIndex) => (
                            <div key={rowIndex} className="toggle-row">
                                {item.text && <div className="toggle-text">{item.text}</div>}
                                {item.buttons && (
                                    <div className='toggle-buttons'>
                                        {item.buttons.map((button, buttonIndex) => (
                                            <button
                                                key={buttonIndex}
                                                className={`toggle-button ${button.active ? 'active' : ''}`}
                                                onClick={() => toggleActiveButton(rowIndex, buttonIndex)} 
                                            >
                                                {button.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="toggle-no-content">Aucun contenu disponible</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ToggleButton;