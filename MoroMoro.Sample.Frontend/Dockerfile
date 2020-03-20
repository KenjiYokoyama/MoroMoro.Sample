FROM node:12.16-buster-slim AS base
WORKDIR /app
COPY ["package.json", "package-lock.json", "tsconfig.json", "./"]
RUN npm install --production --silent

FROM base AS build
WORKDIR /app
RUN npm install --silent
COPY . .
RUN npm run build

FROM base AS product
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/src/server ./src/server
EXPOSE 3000
