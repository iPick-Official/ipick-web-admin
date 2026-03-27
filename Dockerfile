# Step 1: Build
FROM node:20 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV ESLINT_IGNORE_DURING_BUILD=true

RUN npm run build

# Step 2: Run
FROM node:20
WORKDIR /app

COPY --from=builder /app ./

ENV PORT=8080
EXPOSE 8080

CMD ["npm", "run", "start"]