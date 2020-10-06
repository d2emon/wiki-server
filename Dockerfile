FROM node:12.13.0-alpine

WORKDIR /app

RUN mkdir /data

COPY ./node_modules /app/node_modules
COPY ./package*.json /app/

RUN npm install

COPY ./src /app/src

CMD npm run start
