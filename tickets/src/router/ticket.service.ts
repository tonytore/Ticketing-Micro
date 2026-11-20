import {  NotFoundError } from "@salemticket/common";
import { getAllTicketRepo, getSpecificTicketRepo, ticketRepo, updateTicketRepo } from "./ticket.repository.js";

export interface TicketPayload {
  title: string;
  price: number;
  userId: string;
}

export interface UpdateTicketPayload {
  id: string,
  title: string | undefined;
  price: number | undefined;
  userId: string;
}

export function ticketSrv({ title, price, userId }: TicketPayload) {
  return ticketRepo({ title, price, userId });
}

export function getAllTicketSrv(){
  return getAllTicketRepo()
}

export async function getspecificTicketSrv(id:string){
  const item = getSpecificTicketRepo(id)
  if (!item) {
    throw new NotFoundError('Gallery Item not found', 'GalleryService');
  }
  return item;
}

export function updateTicketSrv({id, title, price, userId }: UpdateTicketPayload){
  return updateTicketRepo({ id,title, price, userId })
}