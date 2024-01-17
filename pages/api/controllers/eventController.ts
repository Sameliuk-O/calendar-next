import mongoose from "mongoose";
import { Event } from '../models/eventModel';

export const getEvents = async (req: any, res: any) => {
  const events = await Event.find({}).sort({ createdAt: -1 });

  res.status(200).json(events);
};

export const createEvent = async (req: any, res: any) => {
  const { title } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  try {
    const event = await Event.create({
      ...req.body,
    });
    res.status(200).json({ result: event, status: "success" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const deleteEvent = async (req: any, res: any) => {
  const { id } = req.body;
  const event = await Event.findOneAndDelete({ _id: id });

  if (!event) {
    return res.status(400).json({ error: "No such Event" });
  }

  res.status(200).json(event);
};
