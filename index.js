// index.js

/**
 * Required External Modules
 */

// Import necessary packages
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

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


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));


// Database Connection Info
const MongoClient = require("mongodb").MongoClient;

// the URL we copied from earlier. Replace username and password with what you created in the initial steps
const url = 
"mongodb+srv://VenzlMa:12345$VenzlMa$@gamepot-zzavq.mongodb.net/test?retryWrites=true&w=majority"
let db;

// The index route
app.get("/", function(req, res) {
   res.render("index", { title: "Home" });
});

// Connect to the database with [url]
(async () => {
   let client = await MongoClient.connect(
       url,
       { useNewUrlParser: true }
   );

   db = client.db("GamePot");

   app.listen(PORT, async function() {
       console.log(`Listening on Port ${PORT}`);
       if (db) {
           console.log("Database is Connected!");
       }
   });
})();

// Route to create new player
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
	   res.render("players", { title: "Home" })
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
app.get("/players", async function(req, res) {
   // retrieve ‘lim’ from the query string info
   
   try {
   let lim  = parseInt(req.query);
   db.collection("players")
       .find()
       // -1 is for descending and 1 is for ascending
       .sort({ credits: -1 })
       // Show only [lim] players
	   .limit(lim)
       .toArray(function(error,result) {
		 
            console.log(Array.from(result)); 
			res.send({ status: true, msg: result });
		});
	} catch (error) {
      
      return res.send(error.message);
    }
	
});

