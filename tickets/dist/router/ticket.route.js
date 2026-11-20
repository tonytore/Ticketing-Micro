import { RequireAuth, validate } from "@salemticket/common";
import { Router } from "express";
import { createTickets } from "./ticket.controller";
import { ticketCreateSchema } from "./ricket.schema";
const router = Router();
router.post("/", RequireAuth, validate(ticketCreateSchema), createTickets);
export { router as ticketRouter };
