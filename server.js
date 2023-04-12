const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Conecte-se ao MongoDB
mongoose.connect('mongodb+srv://thauanfelippepro:H21c2mKXbnJdemGV@cluster0.rq3bghy.mongodb.net/minha_lista_de_musicas?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

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
app.listen(process.env.PORT || 3000, () => console.log(`Server listening on port ${process.env.PORT || 3000}`));
