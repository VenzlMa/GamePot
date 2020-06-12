// index.js

/**
 * Required External Modules
 */

// Import necessary packages
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const exphbs = require('express-handlebars');
var cons = require('consolidate');

/**
 * App Variables
 */

// create and configure the express app
const app = express();
const PORT = process.env.PORT || 8000;


app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// Set up handelbars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// setup css and js
app.use(express.static('public'));

/**
 *  Database Connection
 */

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
		    await findPlayers(client);
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

/*
 **API-Calls
 */

// The index route
app.get("/", (req, res) => res.render("home"));
app.get("/home", (req, res) => res.render("home"));
app.get("/players", (req, res) => res.render("playersAG"));

// Access the players from DB
app.get("/api", async function(req, res) {
    // retrieve ‘lim’ from the query string info
    try {
        let lim  = parseInt(req.query);
        db.collection("players")
            .find()
            // -1 is for descending and 1 is for ascending
            //.sort({ credits: -1 })
            // Show only [lim] players
            .limit(lim)
            .toArray(function(error,result) {

                console.log(Array.from(result));
                res.json(result);
            });
    } catch (error) {
        return res.send(error.message);
    }
});

// Access the pot from the DB
app.get("/pot", async function(req, res) {
    // retrieve ‘lim’ from the query string info
    try {
        let lim  = parseInt(req.query);
        db.collection("Pot")
            .find()
            // -1 is for descending and 1 is for ascending
            //.sort({ credits: -1 })
            // Show only [lim] players
            .limit(lim)
            .toArray(function(error,result) {

                console.log(Array.from(result));
                res.json(result);
            });
    } catch (error) {
        return res.send(error.message);
    }
});

/*
app.get('/api',(req, res) => {
    res.json({test: "123"});
});
*/

//Update player
app.put("/players", async function(req, res) {
    let { username, selected, credits } = req.body;
    // check if the username already exists
    const alreadyExisting = await db
        .collection("players")
        .findOne({ username: username });
    if (alreadyExisting) {
        // Update player object with the username
        await db
            .collection("players")
            .updateOne({ username }, { $set: { username, selected, credits } });
        res.send({ status: true, msg: "Update-> " + username });
    } else {
        res.send({ status: false, msg: "player username not found" });
    }
});

//Update pot
app.put("/pot", async function(req, res) {
    let { username, pot } = req.body;
    // check if the username already exists
    //res.redirect("players")
    const alreadyExisting = await db
        .collection("Pot")
        .findOne({ username: username });
    if (alreadyExisting) {
        // Update player object with the username
        await db
            .collection("Pot")
            .updateOne({ username }, { $set: { pot } }); //selected
        // console.log(`Player ${username} credits updated to ${selected}`);
        res.send({ status: true, msg: "Update-> " + pot });
    } else {
        res.send({ status: false, msg: "player username not found" });
    }
});

/*
 * Other fuctions that are not needed in this programm (yet)
 */

/**
 *  ChangeStream
 */

/*
// listens to changes made on the DB
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
});
  await closeChangeStream(timeInMs, changeStream);
}
 */

/* Route to create new player
app.post("/players", async function(req, res) {
   // get information of player from POST body data
   let { username, credits } = req.body;

   // check if the username already exists
   const alreadyExisting = await db
       .collection("GamePot")
       .findOne({ username: username });

   if (alreadyExisting) {
       res.send({ status: false, msg: "player username already exists " +username});
   } else {
       // create the new player
       await db.collection("players").insertOne({ username, credits });
       //console.log(`Created Player ${username}`);
       //res.send({ status: true, msg: "player created-> " + username + ", credits:" + credits});
	   res.render("playersAG", { title: "Home" })
   }
});
*/


/*
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
});*/


/* delete player
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
 */

