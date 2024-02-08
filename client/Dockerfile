FROM node:latest

WORKDIR /app

COPY package*.json /app

RUN npm ci --legacy-peer-deps

COPY . /app

CMD ["npm", "start"]
