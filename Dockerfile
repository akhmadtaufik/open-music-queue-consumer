FROM node:20-slim

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install build dependencies
RUN npm install

# Copy source code
COPY . .

# Start the application
CMD [ "node", "src/consumer.js" ]