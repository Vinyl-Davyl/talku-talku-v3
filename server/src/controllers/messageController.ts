import { NextFunction, Request, Response } from "express";
import messageModel from "../model/messageModel";

export const addMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { from, to, message = "", image = "" } = req.body;
    const data = await messageModel.create({
      message: { text: message },
      users: [from, to],
      sender: from,
      image,
    });
    if (data) return res.json({ msg: "Message added successfully" });
    return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};

export const getAllMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // The object passed to create()contains the properties of the new message.find({ users: { $all: [from, to] } }) This line finds all messages where the users field is an array containing both from and tosort({ updatedAt: 1 }); This line sorts the results by the updatedAt field in ascending order const projectMessages = messages.map((msg) => {This line creates a new array called projectMessages that maps over each message in the messages array and returns a new object with only the necessary fields res.json(projectMessages); This line sends the projectMessages array as a JSON response.
  try {
    const { from, to } = req.body;
    const messages = await messageModel
      .find({ users: { $all: [from, to] } })
      .sort({ updatedAt: 1 });

    const projectMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message?.text,
        image: msg.image || "",
      };
    });
    res.json(projectMessages);
  } catch (ex) {
    next(ex);
  }
};
