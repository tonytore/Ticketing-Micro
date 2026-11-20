import { successResponse } from "@salemticket/common";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../utils/catchAsync";
import { ticketSrv } from "./ticket.service";
const createTickets = catchAsync(async (req, res) => {
    const { title, price } = req.body;
    const userId = req.currentUser.id;
    const ticket = await ticketSrv({ title, price, userId });
    return successResponse(req, res, "ticket created successfully", ticket, StatusCodes.OK);
});
export { createTickets };
