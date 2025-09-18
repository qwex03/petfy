const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');

const app = express()
const server = http.createServer(app);
 

mongoose.connect('mongodb+srv://Quentin:tinder123@tinder.4xtmz.mongodb.net/?retryWrites=true&w=majority&appName=tinder', {useNewUrlParser: true, useUnifiedTopology: true})

const Animal = require('./models/Animal');

app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use(express.json());

const port = process.env.port || 5000;
server.listen(port, ()=>console.log(`Server running on ${port}`))

app.post('/animals', async (req, res) => {
    const {name, age, race, imageUrl} = req.body;
    const animal = new Animal({name, age, race, imageUrl});
    await animal.save();
    res.send(animal);
})

app.get('/animals', async (req, res)=> {
    const animals = await Animal.find();
    res.send(animals)
})

const io = require('socket.io')(server, {
  cors: {
  origin: '*',
  methods: ['GET', 'POST']
  }
  });


  io.on('connection', (socket) => {
    console.log('Utilisateur connecté :', socket.id);
  
    socket.on('joinRoom', (animalId) => {
      console.log(`${socket.id} tente de rejoindre la room ${animalId}`);
      if (animalId) {
        socket.join(animalId);
        console.log(`${socket.id} a rejoint la room ${animalId}`);
      } else {
        console.log("animalId est manquant ou incorrect !");
      }
    });
  
    socket.on('sendMessage', (data) => {
      console.log("Message reçu du client:", data);
      io.to(data.animalId).emit('receiveMessage', data); 
    });
  
    socket.on('disconnect', (reason) => {
      console.log(`Déconnexion de ${socket.id} : ${reason}`);
    });
  });
  



const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes)

const OrgaRoutes = require('./routes/orga');
app.use('/api/orga', OrgaRoutes)

const AnimalRoutes = require('./routes/animals');
app.use('/api/animals', AnimalRoutes);

const UserRoutes = require('./routes/user');
app.use('/api/user', UserRoutes);

