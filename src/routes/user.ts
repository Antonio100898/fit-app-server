import express from "express";
import { User } from "../models/user-model";
import { error, log } from "console";
import { verifyToken } from "../middleware/auth";
import UserModule from "../modules/user";
import { AppResponse } from "../interfaces/interfaces";

export const user = express.Router();
const userModule = new UserModule();

//create new user (sign-up)
user.post("/sign-up", verifyToken, async (req, res) => {
  const { email, password, name } = req.body;
  if (!(email && password && name))
    return res.status(400).send("Required fields: email, password, name");

  const userExistsResponse = await userModule.userExists(email);
  const alreadyExist = userExistsResponse.payload;
  if (userExistsResponse.error) {
    return res
      .status(500)
      .json({ error: true, msg: "internal server error" } as AppResponse);
  }
  if (alreadyExist) {
    return res.status(400).send("User with provided Femail already exists");
  }

  const signUpResponse = await userModule.signUp(email, password, name);
  if (!signUpResponse.error && signUpResponse.payload) {
    return res.status(200).send("User has been successfully created");
  }
  return res
    .status(500)
    .json({ error: true, msg: "user has not been created" } as AppResponse);
});

//get user by id
user.get("/:id", async (req, res) => {
  const { id } = req.params;

  const { error, payload } = await userModule.getUserById(id);
  if (error) {
    return res
      .status(500)
      .json({ error: true, msg: "internal server error" } as AppResponse);
  }
  if (!payload) {
    return res
      .status(404)
      .json({ error: true, msg: "user has not been found" } as AppResponse);
  }
  return res.status(200).json({ error: false, data: payload } as AppResponse);
});

// delete user by id
user.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    if (await User.exists({ _id: id })) {
      await User.deleteOne({ _id: id });
      return res.status(200).send("User has been successfully deleted");
    }
    return res
      .status(404)
      .send(
        `Cannot delete user (user with provided id(${id}) nas not been found)`
      );
  } catch (err) {
    error(err);
    return res.status(500).send(err);
  }
});

//update user by id
user.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    if (await User.exists({ _id: id })) {
      await User.updateOne({ _id: id }, req.body);
      res.status(200).send("User has been successfully updated");
    }
  } catch (err) {
    log(err);
    return res.status(500).send(err);
  }
});

//get all users
user.get("/", async (req, res) => {
  try {
    const users = await User.find().select(userSelectedParams);
    if (!users) return res.status(404).send("Users nas not been found");
    return res.status(200).send(users);
  } catch (err) {
    error(err);
    return res.status(500).send(err);
  }
});

//get list of users by filter
user.get("/:name", async (req, res) => {
  const { name } = req.params;
  log(`name: ${name}`);

  try {
  } catch (err) {
    error(err);
    return res.status(500).send(err);
  }
});
