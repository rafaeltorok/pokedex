# Build stage
FROM node:20-alpine AS build

WORKDIR /app

COPY . .

RUN npm ci
RUN npm run build

# Production stage
FROM node:20-alpine AS production

WORKDIR /usr/src/app

COPY ./package*.json .
COPY ./app.js .
COPY --from=build /app/dist /usr/src/app/dist

RUN npm install --omit=dev

EXPOSE 5001
ENV PORT=5001

CMD ["node", "./app.js"]
