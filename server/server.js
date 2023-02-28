import express, { json } from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(json());

import stores from "./routes/stores.js";
app.use(stores);

import users from "./routes/users.js";
app.use(users);

import reviews from "./routes/reviews.js";
app.use(reviews);

// get driver connection
import { connectToServer } from "./db/conn.js";

app.listen(port, () => {
  // perform a database connection when server starts
  connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
