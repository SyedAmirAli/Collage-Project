import express from "express";
import dotenv from "dotenv";
import { WATER_LEVEL_PROJECT } from "../actions/index.js";
import * as WaterLevel from "../controllers/WaterLevelController.js";
import { notSupportedMethod } from "../controllers/index.js";

const router = express.Router();
dotenv.config();

const { server, route, client } = WATER_LEVEL_PROJECT || {};

router
  .route(route().create)
  .post(WaterLevel.create)
  .get(notSupportedMethod(["POST"]));

router
  .route(route().index)
  .get(WaterLevel.index)
  .post(notSupportedMethod(["GET"]))
  .patch(notSupportedMethod(["GET"]))
  .put(notSupportedMethod(["GET"]))
  .delete(notSupportedMethod(["GET"]));

export default router;
