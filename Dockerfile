FROM node:18

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
COPY ./.env.example ./.env
RUN npm run start
