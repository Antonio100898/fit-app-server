import express from "express";
import { error, log } from "console";
import { verifyToken } from "../middleware/auth";
import UserModule from "../modules/user";
import { AppResponse } from "../interfaces/interfaces";

export const user = express.Router();
const userModule = new UserModule();

//create new user (sign-up)
user.post("/sign-up", verifyToken, async (req, res) => {
  const { email, password, name, userType } = req.body;
  if (!(email && password && name && userType))
    return res.status(400).json({
      error: true,
      msg: "Required fields: email, password, name",
    } as AppResponse);

  const userExistsResponse = await userModule.userExists(email);
  const alreadyExist = userExistsResponse.payload;
  if (userExistsResponse.error) {
    return res
      .status(500)
      .json({ error: true, msg: "internal server error" } as AppResponse);
  }
  if (alreadyExist) {
    return res.status(400).json({
      error: true,
      msg: "User with provided Femail already exists",
    } as AppResponse);
  }

  const signUpResponse = await userModule.signUp(
    email,
    password,
    name,
    userType
  );
  if (!signUpResponse.error && signUpResponse.payload) {
    return res.status(200).json({
      error: false,
      msg: "User has been successfully created",
    } as AppResponse);
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
  const { error, payload } = await userModule.deleteUser(id);
  if (payload) {
    return res.status(200).json({
      error: false,
      msg: "User has been successfully deleted",
    } as AppResponse);
  }
  if (error) {
    return res
      .status(500)
      .json({ error: true, msg: "internal server error" } as AppResponse);
  }
  return res.status(404).json({
    error: true,
    msg: `Cannot delete user (user with provided id(${id}) nas not been found)`,
  } as AppResponse);
});

//update user by id
user.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  const { error, payload } = await userModule.updateUser(id, req.body);
  if (payload) {
    return res
      .status(200)
      .json({
        error: false,
        msg: "User has been successfully updated",
      } as AppResponse);
  }
  if (error) {
    return res
      .status(500)
      .json({ error: true, msg: "internal server error" } as AppResponse);
  }
  return res
    .status(404)
    .json({
      error: true,
      msg: `Cannot update user (user with provided id(${id}) nas not been found)`,
    } as AppResponse);
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
