import express from "express";
import dotenv from "dotenv";
import Controllers from "../controllers/index.js";

const router = express.Router();
dotenv.config();

export default class Routes extends Controllers {
  constructor() {}

  static testRoute() {
    router.route("/test").get(this.testController);

    return router;
  }

  // router function for water level indicator project
  static waterLevel() {
    router
      .route(this.waterLevelNames.route)
      .post(this.waterLevelController)
      .get(this.notSupportedMethod(["POST"]));

    return router;
  }
}
