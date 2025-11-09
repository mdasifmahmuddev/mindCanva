
require('dotenv').config()


const express = require('express')
const app = express()
const port = 3000
var cors = require('cors')
//mongo
const { MongoClient, ServerApiVersion } = require('mongodb');


//cors : security purpose . 
//express : express js a framework which control get , update , delete etc req. 
//node js : node js is a runtime which run server by js . 

app.use(cors())
app.use(express.json())


//mongodb connection information  
//install dotenev for take password from .env 
const uri = `mongodb+srv://asif:${process.env.MONGO_PASSWORD}@mindcanvas.ah8atu6.mongodb.net/?appName=mindCanvas`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //art database connection 
    const database = client.db("mindcanva-db");
    const artworks = database.collection("artworks");

    //find() and findone() =find for all and findone() for specific 

    app.get('/artworks', async (req, res) => {

      const result = await artworks.find().toArray();

       res.send(result)
})


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
   //  await client.close(); : this cause error . 
  }
}
run().catch(console.dir);



 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
