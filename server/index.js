require('dotenv').config();

const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://asif:${process.env.MONGO_PASSWORD}@mindcanvas.ah8atu6.mongodb.net/?appName=mindCanvas`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    const database = client.db("mindcanva-db");
    const artworks = database.collection("artworks");
    const userCollection = database.collection('users');

    app.post('/users', async (req, res) => {
      const newUser = req.body;
      const email = req.body.email;
      const query = { email: email };
      const existingUser = await userCollection.findOne(query);

      if (existingUser) {
        res.send({ message: 'user already exists', insertedId: null });
      } else {
        const result = await userCollection.insertOne(newUser);
        res.send(result);
      }
    });

    app.get('/artworks', async (req, res) => {
      const result = await artworks.find().toArray();
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log("Connected to MongoDB!");
  } finally {
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});