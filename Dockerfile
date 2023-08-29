FROM node:16-alpine AS development

ENV NODE_ENV development

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

COPY . .
COPY ./.env.example ./.env

EXPOSE 3001

CMD [ "npm", "start" ]
