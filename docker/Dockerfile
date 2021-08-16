FROM node:14-alpine3.10

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm ci

EXPOSE 5000

CMD ["node", "./src/index.js"]