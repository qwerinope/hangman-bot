FROM node:21-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

RUN apk update && apk add yarn

COPY package.json /usr/src/app

COPY yarn.lock /usr/src/app

RUN yarn

COPY . /usr/src/app

CMD ["yarn", "start"]
