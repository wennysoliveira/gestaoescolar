# Use Node.js 20
FROM node:20-alpine

# Dependências úteis para binários do Prisma (algumas imagens precisam destas)
RUN apk add --no-cache libc6-compat openssl

# Set working directory
WORKDIR /app

# Defaults de produção
ENV NODE_ENV=production
ENV DATABASE_URL="file:/app/data/prod.db"
ENV UPLOAD_DIR="/app/uploads"

# Garantir diretórios de dados e uploads
RUN mkdir -p /app/data /app/uploads

# Copy package files
COPY package*.json ./

# Install dependencies (including dev dependencies for build)
RUN npm install --include=dev

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Remove dev dependencies after build
RUN npm prune --production

# Declarar volumes para persistência (o painel pode mapear ou manter entre restarts)
VOLUME ["/app/data", "/app/uploads"]

# Expose port
EXPOSE 3000

# Start the application: aplica migrations (se existirem) ou faz db push
CMD ["sh", "-c", "npx prisma migrate deploy || npx prisma db push && node .output/server/index.mjs"]