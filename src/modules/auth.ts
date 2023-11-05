import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserCollection } from "../config/collections";
import { AuthResponseUser, IModuleResponse } from "../interfaces/interfaces";

class Auth {
  private Token: string;

  constructor(token: string) {
    this.Token = token;
  }

  async login(
    email: string,
    password: string
  ): Promise<IModuleResponse<AuthResponseUser> | undefined> {
    try {
      const user = await UserCollection.findOne({ email });
      if (
        this.Token &&
        user &&
        (await bcrypt.compare(password, user.password))
      ) {
        const token = jwt.sign({ user_id: user._id, email }, this.Token, {
          expiresIn: "2h",
        });
        const authUser = { ...user, token: token };
        const { password, ...responseUser } = authUser;
        return { error: false, payload: responseUser };
      }
    } catch {
      return;
    }
  }
}

export default Auth;
