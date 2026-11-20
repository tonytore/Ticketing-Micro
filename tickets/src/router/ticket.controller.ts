import { successResponse } from "@salemticket/common";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../utils/catchAsync.js";
import { getAllTicketSrv, getspecificTicketSrv, ticketSrv, UpdateTicketPayload, updateTicketSrv } from "./ticket.service.js";

const createTickets = catchAsync(async (req: Request, res: Response) => {
  const { title, price } = req.body;
  const userId = req.currentUser!.id;
  const ticket = await ticketSrv({ title, price, userId });
  return successResponse(
    req,
    res,
    "ticket created successfully",
    ticket,
    StatusCodes.OK,
  );
});

const getAllTickets = catchAsync(async (req: Request, res: Response)=>{
  const result = await getAllTicketSrv();
  return successResponse(
    req,
    res,
    "ticket retrived successfully",
    result,
    StatusCodes.OK,
  );
});

const getSpecificTickets = catchAsync(async (req: Request, res: Response)=>{
  const { id } = req.params
  const result = await getspecificTicketSrv(id as string);
  return successResponse(
    req,
    res,
    "specific ticket retrived successfully",
    result,
    StatusCodes.OK,
  );
});

const updateTickets = catchAsync(async (req: Request, res: Response) => {
  const { title, price } = req.body;
  const { id } = req.params 
  const userId = req.currentUser!.id;
  const payload:UpdateTicketPayload = {
    id:id as string,
    title,
    price,
    userId
  }
  const ticket = await updateTicketSrv(payload);
  return successResponse(
    req,
    res,
    "ticket updated successfully",
    ticket,
    StatusCodes.OK,
  );
});


export { createTickets,getAllTickets,getSpecificTickets,updateTickets };
