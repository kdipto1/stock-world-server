const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const jwt = require("jsonwebtoken");
//middleware
app.use(cors());
app.use(express.json());

//Verify token function:
function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (!authHeader) {
    return res.status(401).send({ message: "Unauthorized access" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
    if (err) {
      return res.status(403).send({ message: "Forbidden Access", status: 403 });
    }
    req.decoded = decoded;
    next();
    console.log(authHeader);
  });
}

//mongodb connect
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.p85dy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const inventoryCollection = client.db("stockWorld").collection("items");
    //post item in database
    app.post("/inventory",verifyJWT, async (req, res) => {
      const newItem = req.body;
      const result = await inventoryCollection.insertOne(newItem);
      res.send(result);
    });
    // Home Page items get api
    app.get("/homeInventory", async (req, res) => {
      // const size = parseInt(req.query.size);
      const query = {};
      const cursor = inventoryCollection.find(query, { limit: 6 });
      // items = await cursor.limit(size).toArray();
      let items = await cursor.toArray();
      res.send(items);
    });
    //Get all items from database
    app.get("/manageInventory",verifyJWT, async (req, res) => {
      // const size = parseInt(req.query.size);
      const query = {};
      const cursor = inventoryCollection.find(query);
      // let items;
      // if (size) {
      // items = await cursor.limit(size).toArray();
      // } else {
      const allItems = await cursor.toArray();
      // }
      res.send(allItems);
    });
    //Update single item in database
    app.put("/inventory/:id",verifyJWT, async (req, res) => {
      const id = req.params.id;
      const data = req.body;
      // console.log(data);
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = { $set: { quantity: data.quantity } };
      const result = await inventoryCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });
    //Get single item from database
    app.get("/inventory/:id",verifyJWT, async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const item = await inventoryCollection.findOne(query);
      res.send(item);
    });
    //Delete single item from database
    app.delete("/inventory/:id",verifyJWT, async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await inventoryCollection.deleteOne(query);
      res.send(result);
    });
    // Get user products api
    app.get("/inventoryUser", verifyJWT, async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const cursor = inventoryCollection.find(query);
      const items = await cursor.toArray();
      res.send(items);
    });
    //Get token api
    app.post("/login", async (req, res) => {
      const email = req.body;
      console.log(email);
      const token = await jwt.sign(email, process.env.ACCESS_TOKEN_SECRET);
      res.send({ token: token });
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log(`Listening from port ${port}`);
});
