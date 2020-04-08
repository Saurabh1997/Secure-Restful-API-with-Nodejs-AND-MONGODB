import Passport from "passport";
import PassportJWT from "passport-jwt";
import { getConfig } from "../../config/config";
import User from "../resources/user/user.model";
const config = getConfig(process.env.NODE_ENV); //will get node env from running node process

export const configJWTStrategy = () => {
  const opts = {
    jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret,
  };
  Passport.use(
    new PassportJWT.Strategy(opts, (payload, done) => {
      //passport will extract the payload object from the token
      User.findOne({ _id: payload.id }, (err, user) => {
        if (err) {
          return err;
        }
        if (user) {
          return done(null, user);
        }
        if (!user) {
          return done(null, false); //false means user hasn't authenticated
        }
      });
    })
  );
};
