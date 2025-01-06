"use strict";
import express from "express";
import path from "path";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import memberRoutes from "./routes/member.route.js";
import userRoutes from "./routes/userRoute.js";
import connectDB from "./config/mongoose.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

dotenv.config();
await connectDB();

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
    ].join(" ");
  })
);
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/member", memberRoutes);
app.use(errorMiddleware);
(function fn() {
  if (process.env.NODE_ENV === "production") {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, "/client/dist")));
    app.get("*", (req, res) =>
      res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
    );
  } else {
    app.get("/", (req, res) => {
      res.send("API is running....");
    });
  }
})();

const port = process.env.PORT || 6000;
app.listen(port, () => console.log(`Server running at port: ${port}`));
