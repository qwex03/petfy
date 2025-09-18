import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { jwtDecode } from 'jwt-decode';
import { useParams } from 'react-router-dom';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const { animalId } = useParams();
  const [userId, setUserId] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  
  const socketRef = useRef(null);  

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
    } else {
      console.error('Token introuvable !');
    }

    socketRef.current = io('http://localhost:5000', { transports: ['websocket'] });

    socketRef.current.on('connect', () => {
      console.log('Connecté au serveur Socket.IO');
      setIsConnected(true);
    });

    socketRef.current.on('connect_error', (err) => {
      console.error('Erreur de connexion Socket.IO:', err);
    });

    socketRef.current.on('receiveMessage', (data) => {
      console.log('Message reçu du serveur:', data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socketRef.current.off('receiveMessage');
      socketRef.current.off('connect_error');
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isConnected && animalId) {
      socketRef.current.emit('joinRoom', animalId);
      console.log(`Vous avez rejoint la room ${animalId}`);
    }
  }, [isConnected, animalId]);

  const sendMessage = () => {
    if (message.trim() !== '' && userId && animalId) {
      console.log('Message envoyé :', { from: userId, animalId, message });
      socketRef.current.emit('sendMessage', { from: userId, animalId, message });
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <p key={index} style={{
            color: msg.from === userId ? 'black' : 'brown',
            backgroundColor: 'white',
            padding: '5px',
            borderRadius: '5px',
            textAlign: msg.from === userId ? 'right' : 'left'
          }}>
            {msg.from === userId ? 'Vous' : 'Utilisateur'}: {msg.message}
          </p>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Entrez votre message"
        />
        <button onClick={sendMessage}>Envoyer</button>
      </div>
    </div>
  );
};

export default Chat;
