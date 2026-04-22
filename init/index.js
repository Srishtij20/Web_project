require("dotenv").config();
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("connected to DB");
  await initDB();
  mongoose.connection.close();
}

async function initDB() {
  await Listing.deleteMany({});
  let data = initData.data.map((obj) => ({
    ...obj,
    owner: "69862acfab01954b52515ba9",
  }));
  await Listing.insertMany(data);
  console.log("data was initialized");
}

main().catch(console.log);