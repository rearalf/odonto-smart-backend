# ========== 1) Dependencias ==========
FROM node:20.17.0-alpine3.20 AS deps
WORKDIR /app
RUN apk update && apk upgrade
COPY package*.json ./
RUN npm ci

# ========== 2) Build ==========
FROM node:20.17.0-alpine3.20 AS build
WORKDIR /app
RUN apk update && apk upgrade
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ========== 3) Runtime ==========
FROM node:20.17.0-alpine3.20 AS runner
WORKDIR /app
RUN apk update && apk upgrade
ENV NODE_ENV=production

# Instalar solo deps necesarias para producción
COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts

# Copiar el build desde la etapa "build"
COPY --from=build /app/dist ./dist

# Cloud Run usa la variable $PORT (NestJS debe leerla en main.ts)
ENV PORT=8080
EXPOSE 8080

CMD ["node", "dist/main.js"]
