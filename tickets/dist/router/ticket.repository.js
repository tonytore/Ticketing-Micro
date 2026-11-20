import { db } from "../lib/prisma";
export const ticketRepo = async ({ title, price, userId }) => {
    const result = await db.ticket.create({
        data: {
            title,
            price,
            userId,
        },
    });
    return result;
};
