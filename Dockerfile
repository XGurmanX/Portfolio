# Use a small, well-supported base
FROM node:20-alpine AS base

WORKDIR /app

# Install only production dependencies
COPY package.json package-lock.json* ./
RUN npm install --omit=dev || npm install --production

# Copy source
COPY src ./src
COPY public ./public

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD ["node", "src/server.js"]
