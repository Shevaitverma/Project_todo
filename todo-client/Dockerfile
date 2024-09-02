# Use the official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Vite application
RUN npm run build

# Install a simple HTTP server to serve the built files
RUN npm install -g serve

# Expose port 3000 to the outside world
EXPOSE 3000

# Command to serve the build folder
CMD ["serve", "-s", "dist", "-l", "3000"]
