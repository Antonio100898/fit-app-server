import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/user-model";

class auth {
  private Token: string;

  constructor(token: string) {
    this.Token = token;
  }

  async login(email: string, password: string) {
    try {
      const user = await User.findOne({ email });
      if (
        this.Token &&
        user &&
        (await bcrypt.compare(password, user.password))
      ) {
        const token = jwt.sign({ user_id: user._id, email }, this.Token, {
          expiresIn: "2h",
        });
        user.token = token;
        const { password, ...responseUser } = user.toObject();
        return responseUser;
      }
    } catch {
      return;
    }
  }
}

export default auth;
