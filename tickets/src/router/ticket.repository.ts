import { db } from "../lib/prisma.js";
import { TicketPayload, UpdateTicketPayload } from "./ticket.service.js";

export const ticketRepo = async ({ title, price, userId }: TicketPayload) => {
  const result = await db.ticket.create({
    data: {
      title,
      price,
      userId,
    },
  });
  return result;
};
export const getAllTicketRepo = async ()=>{
  return await db.ticket.findMany({})
}

export const getSpecificTicketRepo = async (id:string)=>{
  return await db.ticket.findUnique({
    where: {
      id
    }
  })
}

export const updateTicketRepo = async ({id, title, price, userId }: UpdateTicketPayload) => {
  const result = await db.ticket.update({
    where:{id},
    data: {
      title,
      price,
      userId,
    },
  });
  return result;
};