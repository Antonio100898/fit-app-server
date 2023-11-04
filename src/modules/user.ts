import { IModuleResponse, IResponseUser } from "../interfaces/interfaces";
import { User } from "../models/user-model";
import bcrypt from "bcryptjs";

const userSelectedParams = ["name", "email", "createdAt"];

class UserModule {
  constructor() {}

  async signUp(
    email: string,
    password: string,
    name: string
  ): Promise<IModuleResponse<boolean>> {
    try {
      const encryptedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        email: email.toLowerCase(),
        password: encryptedPassword,
        name,
        createdAt: Date.now(),
      });
      return { error: false, payload: true };
    } catch (err) {
      console.error(err);
      return { error: true, payload: false };
    }
  }
  async userExists(email: string): Promise<IModuleResponse<boolean>> {
    try {
      const alreadyExists = await User.exists({ email });
      if (alreadyExists) {
        return { error: false, payload: true };
      }
      return { error: false, payload: false };
    } catch (err) {
      console.error(err);
      return { error: true };
    }
  }

  async getUserById(
    id: string
  ): Promise<IModuleResponse<IResponseUser | null>> {
    try {
      const user = await User.findOne({ _id: id }).select(userSelectedParams);
      if (user) {
        return { error: false, payload: user };
      }
      return { error: false, payload: user };
    } catch (err) {
      return { error: true };
    }
  }
}

export default UserModule;
