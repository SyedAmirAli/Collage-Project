import mongoose, { Schema } from "mongoose";

const taskSchema = Schema(
  {
    id: Schema.ObjectId,
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },

  {
    timestamps: true,
    new: true,
  }
);

export const Task = mongoose.model("Task", taskSchema);

export default Task;
// mongoose.model().findByIdAndDelete
