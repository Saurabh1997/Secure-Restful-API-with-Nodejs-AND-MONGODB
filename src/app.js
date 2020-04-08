import express from "express";
import logger from "morgan";
import bodyParser from "body-parser";
import { connect } from "./config/db";
import { restRouter } from "./api";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./config/swagger.json";
import passport from "passport";
import { configJWTStrategy } from "./api/middlewares/passport-jwt";

import { getConfig } from "./config/config";
const app = express();
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}
connect(); //method to connect mongodb
app.use(express.json()); //to parse json  - part of bodyparser
app.use(express.urlencoded({ extended: true })); //to parse url
app.use("/api", restRouter);
app.use(passport.initialize()); // method will create prop into req obj
configJWTStrategy();
app.use(
  "/",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { explorer: true })
);
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.message = "Invalid route";
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at PORT http://localhost:${PORT}`);
});

//npm run dev to run project
