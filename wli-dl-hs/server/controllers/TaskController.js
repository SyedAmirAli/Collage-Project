import dotenv from "dotenv";
import { io } from "../index.js";
import expressAsyncHandler from "express-async-handler";
import { TASK_MANAGEMENT_PROJECT } from "../actions/index.js";
import Task from "../models/Task.js";
dotenv.config();

const { server, route, client } = TASK_MANAGEMENT_PROJECT || {};

export const index = expressAsyncHandler(async function (request, response) {
  let sendResponse = await Task.find();

  response.status(200).json(sendResponse);
  io.emit(server, sendResponse);
});

export const create = expressAsyncHandler(async function (request, response) {
  let sendResponse = {};
  const { title, description } = request.body || {};

  if (!title || !description) {
    sendResponse = {
      status: 203,
      type: "create",
      error: {
        message:
          "`title` or `description` fields is empty on request parameter",
      },
    };
  } else {
    const dbResponse = await Task.create({
      title,
      description,
    });

    sendResponse = { type: "create", status: 200, data: dbResponse };
  }

  response.status(200).json(sendResponse);
  io.emit(server, sendResponse);
});

export const update = expressAsyncHandler(async function (request, response) {
  let sendResponse = {};
  const { title, description } = request.body || {};
  const id = request.params?.id;

  if (!title || !description) {
    sendResponse = {
      status: 203,
      type: "edit",
      error: {
        message:
          "`title` or `description` or `task id` fields is empty on request parameter",
      },
    };
  } else {
    await Task.findByIdAndUpdate(id, {
      title,
      description,
    });

    const dbResponse = await Task.findById(id);
    sendResponse = { type: "edit", status: 200, data: dbResponse };
  }

  response.status(200).json(sendResponse);
  io.emit(server, sendResponse);
});

export const destroy = expressAsyncHandler(async function (request, response) {
  let sendResponse = {};
  const id = request.params?.id;

  if (!id) {
    sendResponse = {
      status: 203,
      type: "delete",
      error: {
        message: "`task id` fields is empty on request parameter",
      },
    };
  } else {
    await Task.findByIdAndDelete(id);
    const dbResponse = { _id: id, id };
    sendResponse = { type: "delete", status: 200, data: dbResponse };
  }

  response.status(200).json(sendResponse);
  io.emit(server, sendResponse);
});
