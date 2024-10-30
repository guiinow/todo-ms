# Use the official Node.js image as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml (if you're using pnpm) to the container
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy the rest of your application code
COPY . .

# Build the application
RUN pnpm run build

# Expose the port your application runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/main.js"]
