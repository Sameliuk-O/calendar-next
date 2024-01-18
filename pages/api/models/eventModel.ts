import mongoose from "mongoose";

const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    timezone: String,
    start_date: String,
    end_date: String,
    start_time: String,
    end_time: String,
  },
  { timestamps: true, _id: true }
);

export const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);
