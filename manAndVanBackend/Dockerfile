FROM node:21.6.2-alpine
WORKDIR /manAndVanBackend
COPY . /manAndVanBackend/
RUN npm install
EXPOSE 4000
CMD [ "npm","start","server.js" ]
