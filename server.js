// server.js

// init project
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongouri = process.env.MONGODB_URI || "mongodb://localhost:27017/dumbtwitter";
const mongo = require("mongodb").MongoClient;
//body-parser middleware
const bodyParser = require('body-parser');
app.use(bodyParser.json());

let dbclient;

const dummyData = [
  {user: "Alex", message: "First Comment"}, 
  {user: "Mary", message: "Hi Internet!"},
  {user: "Alex", message: "You suck!"}
];

// Special piece for running with webpack dev server
if (process.env.NODE_ENV === "development") {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const config = require('./webpack.dev.config.js');
  const compiler = webpack(config);

  // Tell express to use the webpack-dev-middleware and use the webpack.config.js
  // configuration file as a base.
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  }));
}

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + '/app/index.html');
});


//Fetch tweets from the database
app.get("/api/tweets", async(req,res) => {
  const tweetsCollection = await dbclient.collection("tweets");
  const tweets = tweetsCollection.find({});
  res.json(await tweets.toArray());
});

//Post a new tweet
app.post("/api/tweet", async (req,res) =>{
  const body = req.body;
  const user = body.user;
  const message = body.message;
  if(!user || !message){
    res.status(400).send("Missing user or message")
  } else {
    const tweetsCollection = await dbclient.collection("tweets");
    tweetsCollection .insert({user,message});
    res.sendStatus(200);
  }
})

app.get("/counter", async (req, res) =>{
  //Get Collection
  const collection = await dbclient.collection("siteinfo")

  //Find the document you care about
  const item = await collection.findOne( {} );

  // Get your data out of the item
  const pageviews = item ? item.pageviews+1: 1;

  // Save this back sto the database
  await collection.updateOne({}, {
    $set: {
      pageviews: pageviews
    }
  }, {
    upsert: true
  })

  res.send(`This page has been visited ${pageviews} times`)
});

// listen for requests :)

mongo.connect(mongouri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then((client) => {
  dbclient = client.db();

  const listener = app.listen(port, function () {
    console.log('Your app is listening on port ' + port);
});
}); 
//.then is another way of doing the same idea as async -> await


