import express from "express";
import songController from "./song.controller";
import passport from "passport";
import { isArtist } from "../../middlewares/IsArtist";
export const songRouter = express.Router();
//by using passport.authenticate we protect our API by using json web token
const artistPolicy = [
  passport.authenticate("jwt", { session: false }),
  isArtist,
];
songRouter
  .route("/")
  .post(artistPolicy, songController.create)
  .get(
    passport.authenticate("jwt", { session: false }),
    songController.findAll
  );
songRouter
  .route("/:id")
  .get(passport.authenticate("jwt", { session: false }), songController.findOne)
  .delete(artistPolicy, songController.deleteOne)
  .put(artistPolicy, songController.updateOne);
