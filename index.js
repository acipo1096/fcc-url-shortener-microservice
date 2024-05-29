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
  const originalURL = req.body.url
  const result = await addUrl(originalURL);
  console.log("result" + result)
  res.json(result)
});

app.get('/api/shorturl', function(req,res) {

  res.json(addUrl(req.params.url))
})


async function addUrl(newUrl) {
  const urls = model.collection;
  console.log("The posted URL is " + newUrl)
  const urlExists = await urls.findOne({original_url: newUrl})
  if (urlExists) {
    return {"original_url" : urlExists['original_url'], "short_url" : urlExists['short_url']};
  }
  else {
    let returnedUrl = urls.insertOne({original_url: newUrl, short_url: counter})
    console.log(returnedUrl)
    counter++;
    console.log(counter)
    return returnedUrl
  }
}

addUrl();

app.get('/api/shorturl/:shorturl', function(req,res) {
  const shortUrl = req.params.shorturl;
  const getUrl = model.collection.findOne({id: shortUrl});
  res.json({url: getUrl})
})

const idGenerator = () => {
  counter++;
}

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

// I still don't understand bodyParser