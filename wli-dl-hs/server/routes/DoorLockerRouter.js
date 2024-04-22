import express from "express";
import dotenv from "dotenv";
import { DOOR_LOCKER_PROJECT } from "../actions/index.js";
import * as waterLevel from "../controllers/WaterLevelController.js";
import { notSupportedMethod } from "../controllers/index.js";

const router = express.Router();
dotenv.config();

const { server, route, client } = DOOR_LOCKER_PROJECT || {};

router
  .route(route().create)
  .post(waterLevel.create)
  .get(notSupportedMethod(["POST"]));

export default router;
