# Create image based on the official Node 6 image from dockerhub
FROM alpine:3.5

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/CDashboard

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/CDashboard

# Copy dependency definitions
COPY package.json /usr/src/CDashboard

# Install dependecies
RUN npm install

# Get all the code needed to run the app
COPY . /usr/src/CDashboard

# Expose the port the app runs in
EXPOSE 4200

# Serve the app
CMD ["npm", "start"]
