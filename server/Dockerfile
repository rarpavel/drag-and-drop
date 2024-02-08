FROM node:latest

WORKDIR /app

COPY package*.json /app

RUN npm ci

COPY . /app

CMD ["npm", "start"]
