FROM node:latest

WORKDIR /app

COPY package*.json /app

RUN npm ci

COPY . /app

#RUN npm run migration

# COPY migration.js ./
# COPY start-server.sh ./
# RUN chmod +x ./start-server.sh
# ENTRYPOINT ["./start-server.sh"]

CMD ["npm", "start"]
