# Use an official Node.js runtime as a parent image
FROM node:23-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 8000

# Define environment variables (for example, for API keys)
# ENV WEATHER_API_KEY=your_default_api_key

# Run the app when the container launches
CMD [ "node", "server.js" ]