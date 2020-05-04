// login.js

/**
 * Required External Modules
 */


// Import necessary packages
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const exphbs = require('express-handlebars');

//const add = require("./scripts");

/**
 * App Variables
 */

// create and configure the express app
const app = express();
const PORT = process.env.PORT || 8000;

/**
 *  App Configuration
 */
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// Set up handelbars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

var cons = require('consolidate');

// setup css
app.use(express.static('public'));



// view engine setup
//app.engine('html', cons.swig)
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'html');


// The login route
app.get("/", (req, res) => res.render("home"));



var cons = require('consolidate');


// Database Connection Info
const MongoClient = require("mongodb").MongoClient;

// the URL we copied from earlier. Replace username and password with what you created in the initial steps
const url = 
"mongodb+srv://VenzlMa:x2345678@gamepot-zzavq.mongodb.net/test?retryWrites=true&w=majority"
let db;



// Connect to the database with [url]
(async () => {
   let client = 
   await MongoClient.connect(
       url,
       { useNewUrlParser: true }
	   
	  
   );

   db = client.db("GamePot");

   app.listen(PORT, async function() {
       console.log(`Listening on Port ${PORT}`);
	   
       if (db) {
           console.log("Database is Connected!");
		    //await findPlayers(client);
		    await monitorListingsUsingEventEmitter(client);
       }
   });
})();


//other way for fetching data from mongo db with cursors
async function findPlayers(client) {
    // See https://mongodb.github.io/node-mongodb-native/3.3/api/Collection.html#find for the find() docs
    const cursor = client.db("GamePot").collection("players").find({});
    // Store the results in an array. If you will have many customers, you may want to iterate
    // this cursor instead of sending the results to an array. You can use Cursor's forEach() 
    // to do the iterating: https://mongodb.github.io/node-mongodb-native/3.3/api/Cursor.html#forEach
    const results = await cursor.toArray();
    // Process the results
    if (results.length > 0) {
        results.forEach((result, i) => {

            console.log(result);
            // Here you could build your html or put the results in some other data structure you want to work with
        });
    } else {
        console.log(`No players found`);
    }
}


//ChangeStream
// tutorial: https://developer.mongodb.com/quickstart/nodejs-change-streams-triggers
function closeChangeStream(timeInMs = 6000000, changeStream) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Closing the change stream");
            changeStream.close();
            resolve();
        }, timeInMs)
    })
};

async function monitorListingsUsingEventEmitter(client, timeInMs = 6000000, pipeline = []){
   
   const collection = client.db("GamePot").collection("players");
   const changeStream = collection.watch(pipeline);
   
   //log every change
   changeStream.on('change', (next) => {
     console.log(next);
	 
	 if(next.operationType=='insert') {
		 console.log(next.fullDocument.username)
		 //scripts.addPlayer(next.fullDocument.username) -> von Antonia Aufrufen
		 
	 }

});

  await closeChangeStream(timeInMs, changeStream);
   
}




// Route to create new player
app.post("/players", async function(req, res) {
   // get information of player from POST body data
   let {username,credits} = req.body;
   var creditsInt=parseInt(req.body.credits)
   
   let playerNr=1;   
   
   // check if the username already exists
   const alreadyExisting = await db
       .collection("players")
       .findOne({username:username});
	    
   if (alreadyExisting) {
       res.send({ status: false, msg: "player username already exists " + username});
   } else {
       // create the new player
       await db.collection("players").insertOne(
	   { username:username, "credits":creditsInt , playerNr:playerNr}
	   );
       //console.log(`Created Player ${username}`);
       //res.send({ status: true, msg: "player created-> " + username + ", credits:" + credits});
	   res.render("playersAG", { title: "home" })
   }
});

app.put("/players", async function(req, res) {
   let { username, credits } = req.body;
   // check if the username already exists
   const alreadyExisting = await db
       .collection("players")
       .findOne({ username: username });
   if (alreadyExisting) {
       // Update player object with the username
       await db
           .collection("players")
           .updateOne({ username }, { $set: { username, credits } });
       console.log(`Player ${username} credits updated to ${credits}`);
       res.send({ status: true, msg: "Update-> " + username + " credits updated to " + credits });
   } else {
       res.send({ status: false, msg: "player username not found" });
   }
});


// delete player
app.delete("/players", async function(req, res) {
   let { username, credits } = req.body;
   
   // check if the username already exists
   const alreadyExisting = await db
       .collection("players")
       .findOne({ username: username });

   if (alreadyExisting) {
       await db.collection("players").deleteOne({ username });
       console.log(`Player ${username} deleted`);
       res.send({ status: true, msg: "player deleted" });
   } else {
       res.send({ status: false, msg: "username not found" });
   }
});


// Access the leaderboard
app.get("/limitPlayers", async function(req, res) {
   // retrieve ‘lim’ from the query string info
   
   try {
   let lim  = parseInt(req.query);
   db.collection("players")
       .find()
       // -1 is for descending and 1 is for ascending
       .sort({ credits: -1 })
       // Show only [lim] players
       .limit(parseInt(lim))
       .toArray(function(err, result) {
           if (err)
               res.send({ status: false, msg: "failed to retrieve players" });
           console.log(Array.from(result));
           res.send({ status: true, msg: result });
       });
	} catch (error) {
      
      return res.send(error.message);
    }
});


////////////////////////////////////////////////////////////////
//Antonias Script
////////////////////////////////////////////////////////////////


module.exports = {
  index: require('./index')
};