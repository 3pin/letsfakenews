# specify the node base image with your desired version node:<version>
FROM node:13.10.1-stretch-slim

# ARG NODE_ENV=development

# Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install Dependencies
COPY package*.json ./

RUN npm ci

# Copy app source code
COPY . .

# Exports
EXPOSE 3000

CMD ["npm","start"]
