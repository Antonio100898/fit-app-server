import { MongoClient, ServerApiVersion } from "mongodb";
import { MongoDBUri } from "./variables";
import { IUser } from "../interfaces/interfaces";

const uri = MongoDBUri;
if (!uri) throw new Error("no connection string found");

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const FitAppDB = client.db("FitApp");
export const UserCollection = FitAppDB.collection<IUser>("users");
