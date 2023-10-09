FROM node:12.13.0-alpine

WORKDIR /app

RUN mkdir /data

# Packages
COPY ./package*.json ./
RUN npm install

# Folders
COPY src ./src
COPY data ./data
COPY public ./public

# Envs
ENV NODE_PATH ./src
ENV DEBUG wiki:*

# Port to expose
EXPOSE 4001

CMD npm run start
