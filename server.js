const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://thauanfelippepro:H21c2mKXbnJdemGV@cluster0.rq3bghy.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const songSchema = new mongoose.Schema({
  name: String,
  votes: Number,
});

const Song = mongoose.model('Song', songSchema);

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

app.listen(process.env.PORT || 3000, () => console.log(`Server listening on port ${process.env.PORT || 3000}`));
