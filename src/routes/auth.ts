import express, { response } from "express";
import auth from "../modules/auth";
import { AppResponse } from "../interfaces/interfaces";

const authRouterFunc = (authModule: auth) => {
  const auth = express.Router();

  //authenticate by email + pass
  auth.post("/", async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
      const user = await authModule.login(email, password);

      if (user)
        return res.status(200).json({
          error: false,
          data: user,
        } as AppResponse);
      return res.status(400).json({
        error: true,
        msg: "credentials incorrect",
      } as AppResponse);
    }
  });

  return auth;
};

export default authRouterFunc;
