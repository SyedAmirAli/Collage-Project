import express from "express";
import dotenv from "dotenv";
import { TASK_MANAGEMENT_PROJECT } from "../actions/index.js";
import * as Task from "../controllers/TaskController.js";
import { notSupportedMethod } from "../controllers/index.js";

const router = express.Router();
dotenv.config();

const { server, route, client } = TASK_MANAGEMENT_PROJECT || {};

router
  .route(route({}).create)
  .post(Task.create)
  .get(notSupportedMethod(["POST"]));

router
  .route(route({}).index)
  .get(Task.index)
  .post(notSupportedMethod(["GET"]))
  .patch(notSupportedMethod(["GET"]))
  .put(notSupportedMethod(["GET"]))
  .delete(notSupportedMethod(["GET"]));

router
  .route(route({}).create)
  .get(notSupportedMethod(["POST"]))
  .post(Task.create)
  .patch(notSupportedMethod(["POST"]))
  .put(notSupportedMethod(["POST"]))
  .delete(notSupportedMethod(["POST"]));

router
  .route(route({ id: ":id" }).update)
  .get(notSupportedMethod(["PATCH"]))
  .post(notSupportedMethod(["PATCH"]))
  .patch(Task.update)
  .put(notSupportedMethod(["PATCH"]))
  .delete(notSupportedMethod(["PATCH"]));

router
  .route(route({ id: ":id" }).delete)
  .get(notSupportedMethod(["DELETE"]))
  .post(notSupportedMethod(["DELETE"]))
  .put(notSupportedMethod(["DELETE"]))
  .patch(notSupportedMethod(["DELETE"]))
  .delete(Task.destroy);

export default router;
