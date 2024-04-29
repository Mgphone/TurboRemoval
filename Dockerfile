FROM node:21.6.2-alpine
WORKDIR /front
COPY package*.json /front/
RUN npm install
COPY . .
