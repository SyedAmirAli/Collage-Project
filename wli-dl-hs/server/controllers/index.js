import dotenv from "dotenv";
import { io } from "../index.js";
import expressAsyncHandler from "express-async-handler";
import LsNames from "../actions/socketListener.js";
import WaterLevelIndicator from "../models/WaterLevelIndicator.js";
import { NOT_SUPPORTED_LISTENER } from "../actions/index.js";
dotenv.config();

export default class Controllers extends LsNames {
  state = {};

  constructor() {
    // this.state.notSupportedNames = ListenerAndRouteName.notSupportedNames;
    // this.state.waterLevelServerListener = this.waterLevelNames.server;
    // this.state.waterLevelClientListener = this.waterLevelNames.client;
    // this.state.waterLevelRouteName = this.waterLevelNames.route;
  }

  static testController = expressAsyncHandler(function (request, response) {
    const sendResponse = {
      message: "How Are You!",
      request: request.query,
    };

    response.status(200).json(sendResponse);
    io.emit("test__api", sendResponse);
  });

  /**
   * @description controller for water level indicator project
   * @method POST
   * @public only create and send response data for water level indicator
   */
  static waterLevelController = expressAsyncHandler(async function (
    request,
    response
  ) {
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
    io.emit(LsNames.waterLevelNames.server, sendResponse);
  });

  // send bad request
  static notSupportedMethod(methods = []) {
    return expressAsyncHandler(async function (request, response) {
      const sendResponse = {
        status: 400,
        error: {
          type: "BAD_REQUEST",
          supportedMethod: methods,
          message: `This route mainly designed for '${methods.join(
            ", "
          )}' method. Please send your request into a ${methods.join(", ")}`,
        },
      };

      response.status(200).json(sendResponse);
      io.emit(LsNames.notSupportedNames.server, sendResponse);
    });
  }
}

export function notSupportedMethod(methods = []) {
  return expressAsyncHandler(async function (request, response) {
    const sendResponse = {
      status: 400,
      error: {
        type: "BAD_REQUEST",
        supportedMethod: methods,
        message: `This route mainly designed for '${methods.join(
          ", "
        )}' method. Please send your request into a ${methods.join(", ")}`,
      },
    };

    response.status(200).json(sendResponse);
    io.emit(NOT_SUPPORTED_LISTENER.server, sendResponse);
  });
}
