# FROM node:12.16-alpine
FROM node:23-alpine

RUN mkdir app
WORKDIR /app

COPY ./package*.json ./
RUN npm install

COPY ./src ./src
COPY ./.env.dev ./.env

RUN mkdir ./public
RUN mkdir ./public/images
RUN mkdir ./uploads

ENV DEBUG=campaign-manager:*

EXPOSE 5000

CMD npm run start
