import { ticketRepo } from "./ticket.repository";
export function ticketSrv({ title, price, userId }) {
    return ticketRepo({ title, price, userId });
}
