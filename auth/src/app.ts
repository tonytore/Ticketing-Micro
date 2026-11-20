import express from "express";
import cookieSession from "cookie-session";
import bodyParser from "body-parser";
import { authRouter } from "./router/auth.router";
import { CurrentUser, errorHandler } from "@salemticket/common";
import { notFoundHandler } from "@salemticket/common";

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
app.use(CurrentUser)
app.use("/api/users", authRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
