import express, { Request, Response } from "express";
import cookieSession from "cookie-session";
import bodyParser from "body-parser";
import { authRouter } from "./router/auth.router";
import errorHandler from "./utils/error/error_handler";
import notFoundHandler from "./utils/error/not_found_error";

const app = express();
app.use(bodyParser.json());
const port = Number(process.env.PORT || 3000);

app.set("trust proxy", true);

app.use(
  cookieSession({
    signed: false,
    secure: false,
  }),
);
app.use("/api/users", authRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
