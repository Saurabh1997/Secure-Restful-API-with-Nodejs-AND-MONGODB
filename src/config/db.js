import mongoose from "mongoose";
import { getConfig } from "./config";
const config = getConfig(process.env.NODE_ENV); //will get node env from running node process

//mongoose.Promise = global.Promise
export const connect = () =>
  // mongoose.connect("mongodb://localhost/music_api", { useNewUrlParser: true });
  mongoose.connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
