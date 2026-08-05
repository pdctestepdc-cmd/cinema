# syntax=docker/dockerfile:1
FROM node:22-bookworm-slim AS build
WORKDIR /app
COPY package.json ./
RUN --mount=type=cache,target=/root/.npm npm install --prefer-offline --no-audit --no-fund --progress=false
COPY . .
RUN npm run build

FROM node:22-bookworm-slim
WORKDIR /app
ENV NODE_ENV=production
COPY package.json ./
RUN --mount=type=cache,target=/root/.npm npm install --prefer-offline --no-audit --no-fund --progress=false --omit=dev
COPY --from=build /app/dist ./dist
EXPOSE 3000
ENV PORT=3000
ENTRYPOINT ["node", "dist/main"]
