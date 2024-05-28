require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const {connectDB, model} = require("./config/db")

connectDB();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', function(req,res) {
  const originalURL = req.body.url;
})

app.get('/api/shorturl/:shorturl', function(req,res) {
  const shorturl = req.body.url;
})

const addURL = (newURL) => {
  const urls = model.collection('url_shortener');
  const urlMapping = await.collection.findOne({shortU})
}

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
