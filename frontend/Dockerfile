# Use a Node.js base image for building
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Use a smaller Nginx base image for serving (or just Node again if preferred)
FROM node:18-alpine AS runner

WORKDIR /app

# Set environment variables for Next.js standalone output
ENV NODE_ENV production

# Copy only necessary files from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Expose the port Next.js listens on (default 3000)
EXPOSE 3000

# Command to run the application
CMD ["node", "server.js"]