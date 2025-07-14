# Use Node 22 as base image
FROM node:22-alpine AS base

# Set working directory
WORKDIR /app

# Copy package files
COPY frontend/package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY frontend/ ./

# Build stage
FROM base AS build
RUN npm ci
RUN npm run build

# Production stage
FROM node:22-alpine AS production

WORKDIR /app

# Install serve to serve the built app
RUN npm install -g serve

# Copy built files from build stage
COPY --from=build /app/dist ./dist

# Expose port
EXPOSE 3000

# Start the application
CMD ["serve", "-s", "dist", "-l", "3000"]