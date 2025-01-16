"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const port = process.env.PORT || 5000;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv").config();
const app = (0, express_1.default)();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const axios_1 = __importDefault(require("axios"));
const node_cron_1 = __importDefault(require("node-cron"));
//middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
node_cron_1.default.schedule("*/10 * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get("https://stock-world-server.onrender.com");
        console.log("Server pinged successfully");
    }
    catch (error) {
        console.error("Error pinging server:", error);
    }
}));
//Verify token function:
function verifyJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (!authHeader) {
        return res.status(401).send({ message: "Unauthorized access" });
    }
    const token = authHeader.split(" ")[1];
    jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
        if (err) {
            return res
                .status(403)
                .send({ message: "Forbidden Access", status: 403 });
        }
        req.decoded = decoded;
        next();
        console.log(authHeader);
    });
}
const client = new mongodb_1.MongoClient(process.env.MONGODB_URI, {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const inventoryCollection = client.db("stockWorld").collection("items");
            //post item in database
            app.post("/inventory", verifyJWT, (req, res) => __awaiter(this, void 0, void 0, function* () {
                const newItem = req.body;
                const result = yield inventoryCollection.insertOne(newItem);
                res.send(result);
            }));
            // Home Page items get api
            app.get("/homeInventory", (req, res) => __awaiter(this, void 0, void 0, function* () {
                // const size = parseInt(req.query.size);
                const query = {};
                const cursor = inventoryCollection.find(query, { limit: 6 });
                // items = await cursor.limit(size).toArray();
                let items = yield cursor.toArray();
                res.send(items);
            }));
            //Get all items from database
            app.get("/manageInventory", verifyJWT, (req, res) => __awaiter(this, void 0, void 0, function* () {
                // const size = parseInt(req.query.size);
                const query = {};
                const cursor = inventoryCollection.find(query);
                // let items;
                // if (size) {
                // items = await cursor.limit(size).toArray();
                // } else {
                const allItems = yield cursor.toArray();
                // }
                res.send(allItems);
            }));
            //Update single item in database
            app.put("/inventory/:id", verifyJWT, (req, res) => __awaiter(this, void 0, void 0, function* () {
                const id = req.params.id;
                const data = req.body;
                // console.log(data);
                const filter = { _id: new mongodb_1.ObjectId(id) };
                const options = { upsert: true };
                const updateDoc = { $set: { quantity: data.quantity } };
                const result = yield inventoryCollection.updateOne(filter, updateDoc, options);
                res.send(result);
            }));
            //Get single item from database
            app.get("/inventory/:id", verifyJWT, (req, res) => __awaiter(this, void 0, void 0, function* () {
                const id = req.params.id;
                const query = { _id: new mongodb_1.ObjectId(id) };
                const item = yield inventoryCollection.findOne(query);
                res.send(item);
            }));
            //Delete single item from database
            app.delete("/inventory/:id", verifyJWT, (req, res) => __awaiter(this, void 0, void 0, function* () {
                const id = req.params.id;
                const query = { _id: new mongodb_1.ObjectId(id) };
                const result = yield inventoryCollection.deleteOne(query);
                res.send(result);
            }));
            // Get user products api
            app.get("/inventoryUser", verifyJWT, (req, res) => __awaiter(this, void 0, void 0, function* () {
                const email = req.query.email;
                const query = { email: email };
                const cursor = inventoryCollection.find(query);
                const items = yield cursor.toArray();
                res.send(items);
            }));
            //Get token api
            app.post("/login", (req, res) => __awaiter(this, void 0, void 0, function* () {
                const email = req.body;
                console.log(email);
                const token = yield jsonwebtoken_1.default.sign(email, process.env.ACCESS_TOKEN_SECRET);
                res.send({ token: token });
            }));
        }
        finally {
        }
    });
}
run().catch(console.dir);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.listen(port, () => {
    console.log(`Listening from port http://localhost:${port}`);
});
