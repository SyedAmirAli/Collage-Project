import dotenv from "dotenv";
import { io } from "../index.js";
import expressAsyncHandler from "express-async-handler";
import WaterLevelIndicator from "../models/WaterLevelIndicator.js";
import { WATER_LEVEL_PROJECT } from "../actions/index.js";

dotenv.config();
const { server, route, client } = WATER_LEVEL_PROJECT || {};

export const create = expressAsyncHandler(async function (request, response) {
  let sendResponse = {};
  const { title, data, distance, level } = request.body || {};

  if (!title || !data) {
    sendResponse = {
      status: 203,
      error: {
        message: "`data` or `title` fields is empty on request parameter",
      },
    };
  } else {
    const dbResponse = await WaterLevelIndicator.create({
      title,
      data,
      distance,
      level,
    });

    sendResponse = { status: 200, data: dbResponse };
  }

  response.status(200).json(sendResponse);
  io.emit(server, sendResponse);
});
