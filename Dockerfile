FROM node:lts-alpine

WORKDIR /app

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

CMD ["npm", "start"]
