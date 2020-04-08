import jwt from "jsonwebtoken";
import { getConfig } from "../../config/config";
// import { devConfig } from "../../config/env/development";
const config = getConfig(process.env.NODE_ENV); //will get node env from running node process
export default {
  issue(payload, expiresIn) {
    return jwt.sign(payload, config.secret, {
      expiresIn,
    });
  },
};
//secret key is generated in development.js in env folder
