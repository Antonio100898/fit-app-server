import express from "express";
import auth from "../modules/auth";
import { AppResponse } from "../interfaces/interfaces";
import { jsonResponse } from "../helpers/helpers";

const authRouterFunc = (authModule: auth) => {
  const auth = express.Router();

  //authenticate by email + pass
  auth.post("/", async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
      const user = await authModule.login(email, password);

      if (user) return res.status(200).json(jsonResponse(false, "", user));
      return res
        .status(400)
        .json(jsonResponse(true, "Email or password incorrect"));
    }
  });

  return auth;
};

export default authRouterFunc;
