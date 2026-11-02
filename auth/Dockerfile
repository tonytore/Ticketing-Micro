FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
COPY ./prisma ./prisma

RUN npm run prisma:generate

EXPOSE 3000

CMD ["npm", "start"]