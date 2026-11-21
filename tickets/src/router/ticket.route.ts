import { RequireAuth, validate } from "@salemticket/common";
import { Router } from "express";
import { getSpecificTicketSchema, getTicketSchema, ticketCreateSchema, ticketUpdateSchema } from "./ricket.schema.js";
import { createTickets, getAllTickets, getSpecificTickets, updateTickets } from "./ticket.controller.js";

const router = Router();

router.post("/", RequireAuth, validate(ticketCreateSchema), createTickets);
router.post("/", RequireAuth, validate(getTicketSchema), getAllTickets);
router.post("/:id", RequireAuth, validate(getSpecificTicketSchema), getSpecificTickets);
router.post("/:id", RequireAuth, validate(ticketUpdateSchema), updateTickets);


export { router as ticketRouter };
