require('dotenv').config();
const express = require('express');
const bodyParse = require('body-parser')
const cors = require('cors');
const app = express();
const {connectDB, model} = require("./config/db");
const bodyParser = require('body-parser');

connectDB();

let counter = 1;

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.json())

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', function(req,res) {
  console.log(req.body.url)
  const originalURL = ""
  res.json(addUrl(originalURL));
})

app.get('/api/shorturl/:shorturl', function(req,res) {
  const shortUrl = req.params.shorturl;
  const getUrl = model.collection.findOne({id: shortUrl});
  res.json({url: getUrl})
})

const addUrl = (newUrl) => {
  const urls = model.collection;
  console.log(newUrl)
  const urlExists = urls.findOne({url: newUrl})
  if (urlExists) return urlExists;
  else {
    urls.insertOne({id: counter, url: newUrl})
    counter++;
    return newUrl;
  }
}

addUrl();

const idGenerator = () => {
  counter++;
}

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
