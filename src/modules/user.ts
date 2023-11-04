import { DeleteResult, ObjectId } from "mongodb";
import { UserCollection } from "../config/collections";
import {
  IModuleResponse,
  IResponseUser,
  IUser,
  UserType,
} from "../interfaces/interfaces";
import bcrypt from "bcryptjs";

const userSelectedParams = ["name", "email", "createdAt"];

class UserModule {
  constructor() {}

  async signUp(
    email: string,
    password: string,
    name: string,
    userType: UserType
  ): Promise<IModuleResponse<boolean>> {
    try {
      const encryptedPassword = await bcrypt.hash(password, 10);
      const user = await UserCollection.insertOne({
        email: email.toLocaleLowerCase(),
        password: encryptedPassword,
        username: name,
        userType: userType,
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
      const user = await UserCollection.findOne({ email });
      if (user) {
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
    const objectId = new ObjectId(id);
    try {
      const user = await UserCollection.findOne({ _id: objectId });
      if (user) {
        return { error: false, payload: user };
      }
      return { error: false, payload: user };
    } catch (err) {
      return { error: true };
    }
  }

  async deleteUser(id: string): Promise<IModuleResponse<boolean>> {
    try {
      const objectId = new ObjectId(id);
      const { deletedCount } = await UserCollection.deleteOne({
        _id: objectId,
      });
      if (deletedCount > 0) {
        return { error: false, payload: true };
      }
      return { error: false, payload: false };
    } catch (err) {
      console.error(err);
      return { error: true };
    }
  }

  async updateUser(
    id: string,
    data: Partial<IUser>
  ): Promise<IModuleResponse<boolean>> {
    try {
      const objectId = new ObjectId(id);
      const { modifiedCount } = await UserCollection.updateOne(
        { _id: objectId },
        data
      );
      if (modifiedCount > 0) {
        return { error: false, payload: true };
      }
      return { error: false, payload: false };
    } catch (err) {
      console.error(err);
      return { error: true };
    }
  }
}

export default UserModule;
