import express, { json } from "express";
const app = express();
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import passport from "passport";
import passportInit from "./auth/passport.js";

import users from "./routes/users.js";
import stores from "./routes/stores.js";
import reviews from "./routes/reviews.js";
import favorites from "./routes/favorites.js";

dotenv.config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(json());

app.use(bodyParser.urlencoded({ extended: false }));

passportInit(passport);

app.use(users);
app.use(stores);
app.use(reviews);

app.use(
  "/user",
  passport.authenticate("jwt", { session: false }),
  stores,
  favorites,
  users
);

// get driver connection
import { connectToServer } from "./db/conn.js";

app.listen(port, () => {
  // perform a database connection when server starts
  connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
