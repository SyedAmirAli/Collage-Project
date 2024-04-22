import mongoose from "mongoose";

const DoorLocker = mongoose.Schema(
  {
    id: mongoose.Schema.ObjectId,

    title: {
      type: String,
      trim: true,
    },

    name: {
      type: String,
      trim: true,
    },

    data: {
      type: String,
      trim: true,
    },

    sensorStatus: {
      type: String,
      trim: true,
    },

    fingerprintId: {
      type: String,
      trim: true,
    },

    password: {
      type: String,
      trim: true,
    },

    qrCode: {
      type: String,
      trim: true,
    },

    status: {
      type: Boolean,
      default: true,
    },

    trash: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, new: true }
);

export default mongoose.model("DoorLocker", DoorLocker);
