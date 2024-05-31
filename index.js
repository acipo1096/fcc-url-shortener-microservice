require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
const {connectDB, model} = require("./config/db");

connectDB();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', async function(req,res) {
  const httpRegex = /^http[s]?:\/\//;
  const originalURL = req.body.url
  if (httpRegex.test(originalURL)) {
    const result = await addUrl(originalURL);
    res.json(result)
  }
  else {
    res.json({error: "Invalid URL"})
  }
});

async function addUrl(newUrl) {
  const urls = model.collection;
  const urlExists = await urls.findOne({original_url: newUrl})
  if (urlExists) {
    return {"original_url" : urlExists['original_url'], "short_url" : urlExists['short_url']};
  }
  else {
    await urls.insertOne({original_url: newUrl, short_url: await getDocs() + 1})
    return {"original_url" : newUrl, "short_url" : await getDocs()}
  }
}

app.get('/api/shorturl/:shorturl', async function(req,res) {
  const shortUrl = parseInt(req.params.shorturl);
  const getUrl = await model.collection.findOne({short_url:shortUrl });
  res.redirect(getUrl["original_url"]);
})


async function getDocs(){
  const count = await model.countDocuments();
  return count;
}

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

// I still don't understand bodyParser