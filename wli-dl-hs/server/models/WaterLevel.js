import mongoose from "mongoose";

export const WaterLevel = mongoose.model(
  "WaterLevel",
  mongoose.Schema(
    {
      id: mongoose.Schema.ObjectId,

      title: { type: String, trim: true },

      data: { type: String, trim: true },

      distance: { type: Number, trim: true },

      level: { type: Number, trim: true },

      manualMotorSwitch: { type: Boolean, trim: true },

      motorStartTime: { type: String, trim: true },

      motorStatus: { type: Boolean, trim: true },

      motorEndTime: { type: String, trim: true },

      status: { type: Boolean, default: true },

      trash: { type: Boolean, default: false },

      distanceUnit: {
        type: String,
        enum: ["cm", "km", "mi", "m", "inch"],
        default: "cm",
      },
    },
    {
      timestamps: true,
      new: true,
    }
  )
);

export default WaterLevel;
