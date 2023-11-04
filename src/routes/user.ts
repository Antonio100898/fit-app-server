import express from "express";
import { error } from "console";
import { verifyToken } from "../middleware/auth";
import UserModule from "../modules/user";
import { AppResponse } from "../interfaces/interfaces";
import { jsonResponse } from "../helpers/helpers";

export const user = express.Router();
const userModule = new UserModule();

//create new user (sign-up)
user.post("/sign-up", verifyToken, async (req, res) => {
  const { email, password, name, userType } = req.body;
  if (!(email && password && name && userType))
    return res
      .status(400)
      .json(jsonResponse(true, "Required fields: email, password, name"));

  const userExistsResponse = await userModule.userExists(email);
  const alreadyExist = userExistsResponse.payload;
  if (userExistsResponse.error) {
    return res.status(500).json(jsonResponse(true, "Internal server error"));
  }
  if (alreadyExist) {
    return res
      .status(400)
      .json(jsonResponse(true, "User with provided Femail already exists"));
  }

  const signUpResponse = await userModule.signUp(
    email,
    password,
    name,
    userType
  );
  if (!signUpResponse.error && signUpResponse.payload) {
    return res
      .status(200)
      .json(jsonResponse(false, "User has been successfully created"));
  }
  return res
    .status(500)
    .json(jsonResponse(true, "User has not been created (Server error)"));
});

//get user by id
user.get("/:id", async (req, res) => {
  const { id } = req.params;

  const { error, payload } = await userModule.getUserById(id);
  if (error) {
    return res.status(500).json(jsonResponse(true, "Internal server error"));
  }
  if (!payload) {
    return res.status(404).json(jsonResponse(true, "User has not been found"));
  }
  return res.status(200).json(jsonResponse(false, "", payload));
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
    return res.status(500).json(jsonResponse(true, "Internal server error"));
  }
  return res
    .status(404)
    .json(
      jsonResponse(
        true,
        `Cannot delete user (User with provided id(${id}) nas not been found)`
      )
    );
});

//update user by id
user.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  const { error, payload } = await userModule.updateUser(id, req.body);
  if (payload) {
    return res
      .status(200)
      .json(jsonResponse(false, "User has been successfully updated"));
  }
  if (error) {
    return res.status(500).json(jsonResponse(true, "Internal server error"));
  }
  return res
    .status(404)
    .json(
      jsonResponse(
        true,
        `Cannot update user (User with provided id(${id}) nas not been found)`
      )
    );
});

//get all users
user.get("/", async (req, res) => {
  try {
    const { error, payload } = await userModule.getAllUsers();
    if (!error) {
      return res.status(200).json(jsonResponse(false, "", payload));
    }
  } catch (err) {
    error(err);
    return res.status(500).json(jsonResponse(true, "Internal serever error"));
  }
});
