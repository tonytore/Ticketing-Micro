FROM node:22-alpine

WORKDIR /app

# Install pnpm directly via npm (avoids Corepack dynamic download timeouts)
RUN npm install -g pnpm@12.18.0

# Copy dependency specifications and pnpm lockfile
COPY package.json pnpm-lock.yaml* ./

# Install dependencies using the existing lockfile
RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 3000

CMD ["pnpm", "run", "dev"]