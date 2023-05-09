
# Usage: docker-compose build --target development
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm cache clean --force && rm -rf node_modules && npm install
RUN npm rebuild bcrypt
RUN npm install -g ts-node
COPY . .

CMD ["npm", "run", "start"]