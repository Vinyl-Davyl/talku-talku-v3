import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

import userRoutes from "./routes/userRoutes";
import messagesRoutes from "./routes/messagesRoute";
const socket = require("socket.io");

declare global {
  var onlineUsers: any;
  var chatSocket: any;
}

const app = express();
require("dotenv").config();

app.use(cors());

//: Parses JSON and urlencoded request bodies with a maximum size of 30MB.
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json());

//: Mounts the user authentication and messaging routes under the "/api/auth" path.
app.use("/api/auth", userRoutes);
app.use("/api/messages", messagesRoutes);

mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => {
    console.log("DB Connection Succesfull!");
  })
  .catch((err: Error) => {
    console.log(err.message);
  });

const server = app.listen(process.env.PORT, () => {
  console.log(`Speak Lord!! Your server is running on Port ${process.env.PORT}`);
});

const io = socket(server, {
  cors: {
    origin: ["*", "https://talku-talku-v3.vercel.app", "https://talku-talku-v3-server-5wgbjqivt-vinyl-davyl.vercel.app", "https://talku-talku-v3-server.vercel.app"],
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket: any) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId: string) => {
    onlineUsers.set(userId, socket.id);
  });
  socket.on("send-msg", (data: any) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});
