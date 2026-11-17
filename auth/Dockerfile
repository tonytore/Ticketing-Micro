FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
COPY ./prisma ./prisma
COPY prisma7.config.ts ./

RUN npm run prisma:generate

EXPOSE 3000

CMD ["npm", "start"]