# Use Node.js 20
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Ensure Prisma SQLite path is consistent in all environments (absolute path in container)
ENV DATABASE_URL="file:/app/prisma/dev.db"

# Ensure the SQLite directory exists and is writable in production
RUN mkdir -p prisma \
  && chown -R node:node prisma

# Copy package files
COPY package*.json ./

# Install dependencies (including dev dependencies for build)
RUN npm install

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Remove dev dependencies after build
RUN npm prune --production

# Run the application as non-root for proper FS permissions
USER node

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]