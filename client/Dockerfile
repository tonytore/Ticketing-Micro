FROM node:20-alpine

# Enable corepack so pnpm is available without extra installs
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy dependency specifications and pnpm lockfile
COPY package.json pnpm-lock.yaml* ./

# Install dependencies using the existing lockfile
RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 3000

CMD ["pnpm", "run", "dev"]