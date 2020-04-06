import express from "express";
import { songRouter } from "./resources/song";
export { userRouter } from "./resources/user";

export const restRouter = express.Router();
restRouter.use("/songs", songRouter);
restRouter.use("/users", userRouter);
