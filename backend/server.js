const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Conecte-se ao MongoDB (substitua 'your_mongodb_connection_string' pela sua string de conexão)
mongoose.connect('mongodb://localhost:27017/minha_lista_de_musicas', { useNewUrlParser: true, useUnifiedTopology: true });


const songSchema = new mongoose.Schema({
  name: String,
  votes: Number,
});

const Song = mongoose.model('Song', songSchema);

// Rotas
app.get('/songs', async (req, res) => {
  const songs = await Song.find();
  res.json(songs);
});

app.post('/songs', async (req, res) => {
  const song = new Song(req.body);
  await song.save();
  res.json(song);
});

app.put('/songs/:id/vote', async (req, res) => {
  const song = await Song.findById(req.params.id);
  song.votes += 1;
  await song.save();
  res.json(song);
});

// Inicie o servidor na porta 3000
app.listen(3000, () => console.log('Server listening on port 3000'));
