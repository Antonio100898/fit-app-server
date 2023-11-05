import auth from "./src/routes/auth";
import { error } from "console";
import { user } from "./src/routes/user";
import bodyParser from "body-parser";
import { PORT } from "./src/config/variables";
import AuthModule from "./src/modules/auth";
import { TOKEN_KEY } from "./src/config/variables";
import express from "express";

const app = express();

const authModule = new AuthModule(TOKEN_KEY || "");

app.use(bodyParser.json());
app.use("/auth", auth(authModule));
app.use("/user", user);

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log("Server starts on port " + PORT);
    });
  } catch (err) {
    error(err);
  }
};

start();
