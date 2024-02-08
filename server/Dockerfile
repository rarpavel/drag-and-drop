FROM node:latest

WORKDIR /app

COPY . .

RUN npm install
RUN npm run migration

EXPOSE 8000

CMD ["npm", "start"]
