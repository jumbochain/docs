# Stage 1: Build
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build  # Builds static site into /app/build

# Stage 2: Serve the static site
FROM node:18-slim

WORKDIR /app

# Copy only the built site
COPY --from=builder /app/build ./build

# Install Docusaurus CLI to run `docusaurus serve`
RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]
