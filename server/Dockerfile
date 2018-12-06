FROM node:8.14.0

RUN mkdir /node

RUN mkdir /node/server

WORKDIR /node/server

COPY . /node/server

RUN npm install

RUN npm link