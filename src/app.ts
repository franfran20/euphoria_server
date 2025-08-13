import express, { Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import config from "./config/";

import authRoutes from "./routes/auth.route";
import bookRoutes from "./routes/books.route";
import userRoutes from "./routes/user.route";
import seasonRoutes from "./routes/season.route";

import authenticated from "./middleware/authenticated";
import { errorHandler } from "./middleware/errorHandler";
import { connectToDB } from "./db";

const app: Express = express();

// const clientOrigin = "https://euphoria-client-lilac.vercel.app/";

// app.use(
//   cors({
//     origin: clientOrigin,
//     credentials: true,
//   })
// );

app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Welcome There!");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/books", authenticated, bookRoutes);
app.use("/api/v1/users", authenticated, userRoutes);
app.use("/api/v1/seasons", authenticated, seasonRoutes);
app.use(errorHandler);

const startServer = async () => {
  try {
    // mongoose db connection
    await connectToDB();

    app.listen(config.PORT, () => {
      console.log(`Server listening on port ${config.PORT}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

startServer();
