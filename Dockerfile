#Build stage
FROM node:20.15.1 AS build

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

#Production stage
FROM node:20.15.1 AS production

WORKDIR /app

COPY package*.json .

RUN npm ci --only=production

COPY --from=build /app/dist ./dist

COPY .env ./dist

CMD ["node", "dist/index.js"]