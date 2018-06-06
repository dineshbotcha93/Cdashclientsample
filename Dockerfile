# Create image based on the official Node 6 image from dockerhub
FROM mhart/alpine-node:latest as node

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/CDashboard

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/CDashboard

# Copy dependency definitions
COPY package.json /usr/src/CDashboard/

# Install dependecies
RUN apk add --update nodejs nodejs-npm
RUN npm install

# Get all the code needed to run the app
COPY ./dist/ /usr/src/CDashboard/

# Expose the port the app runs in
EXPOSE 81

# Serve the app
CMD ["npm", "start"]

FROM nginx:1.13
COPY --from=node /usr/src/CDashboard/dist/ /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
