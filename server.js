const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

// Atualize a configuração do CORS
app.use(cors({
  origin: '*', // Permite qualquer origem
  methods: ['GET', 'POST', 'PUT'], // Permite métodos específicos
  allowedHeaders: ['Content-Type'], // Permite headers específicos
}));

// Conecte-se ao MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });


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

// Adicione essa linha para servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname));

module.exports = app;

