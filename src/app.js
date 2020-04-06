import express from "express";
import logger from "morgan";
import bodyParser from "body-parser";
import { connect } from "./config/db";
import { restRouter } from "./api";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./config/swagger.json";

const app = express();
const PORT = 3000;
app.use(logger("dev"));
connect(); //method to connect mongodb
app.use(express.json()); //to parse json  - part of bodyparser
app.use(express.urlencoded({ extended: true })); //to parse url
app.use("/api", restRouter);
app.use(
  "/api-docs",
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
