# Dockerfile (located in ./frontend)
FROM node:20-alpine

WORKDIR /app

# Copy package.json and package-lock.json first to cache npm install
COPY package*.json ./

# Install dependencies. These will be in a separate volume thanks to docker-compose.yml
RUN npm install

# Don't COPY the entire source code for development, as we'll mount it via volume.
# This makes the build faster and image smaller for dev.

EXPOSE 3000

# Command to run the React development server
CMD ["npm", "start"]