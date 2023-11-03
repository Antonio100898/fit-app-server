import { log } from "console";
import { TOKEN_KEY } from "../config/variables";
import jwt from 'jsonwebtoken';

export const verifyToken = (req: any, res: any, next: any) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("Missing authentication token");
  }

  try {
    if (!TOKEN_KEY) return log('TOKEN_KEY in config is undefined')
    const decoded = jwt.verify(token, TOKEN_KEY);
    req.user = decoded;

  } catch (err) {
    return res.status(401).send("Invalid Token");
  }

  return next();
};
