import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { createServer } from "http";
import setupSocket from "./utils/socket.js";
import { app } from "./app.js";

dotenv.config({ path: "./.env" });


const server = createServer(app);
setupSocket(server);

connectDB()
  .then(() => {
    server.listen(process.env.PORT || 4000, () => {
      console.log(`Server is running on port ${process.env.PORT || 4000}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to mongoDB at src/index.js", error);
  });
