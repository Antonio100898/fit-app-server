import express from "express";

import auth from "./src/routes/auth";
import { error, log } from "console";
import mongoose from "mongoose";
import { user } from "./src/routes/user";
import bodyParser from "body-parser";
import { MONGODB_URI, PORT } from "./src/config/variables";
import AuthModule from "./src/modules/auth";
import { TOKEN_KEY } from "./src/config/variables";

const app = express();

const authModule = new AuthModule(TOKEN_KEY || "");

app.use(bodyParser.json());
app.use("/auth", auth(authModule));
app.use("/user", user);

const start = async () => {
  try {
    if (MONGODB_URI) await mongoose.connect(MONGODB_URI);
    app.listen(PORT, () => {
      console.log("Server starts on port " + PORT);
    });
  } catch (err) {
    error(err);
  }
};

start();
