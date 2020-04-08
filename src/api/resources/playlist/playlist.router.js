import express from "express";
import playlistController from "./playlist.controller";
import passport from "passport";

export const playlistRouter = express.Router();

playlistRouter
  .route("/")
  .post(
    passport.authenticate("jwt", { session: false }),
    playlistController.create
  )
  .get(
    passport.authenticate("jwt", { session: false }),
    playlistController.findAll
  );
