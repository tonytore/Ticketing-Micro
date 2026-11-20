import express from "express";
import cookieSession from "cookie-session";
import bodyParser from "body-parser";
import { CurrentUser, errorHandler } from "@salemticket/common";
import { notFoundHandler } from "@salemticket/common";
import { ticketRouter } from "./router/ticket.route";
const app = express();
app.use(bodyParser.json());
app.set("trust proxy", true);
app.use(cookieSession({
    signed: false,
    secure: false,
}));
app.use(CurrentUser);
app.use("/api/tickets", ticketRouter);
app.use(notFoundHandler);
app.use(errorHandler);
export default app;
