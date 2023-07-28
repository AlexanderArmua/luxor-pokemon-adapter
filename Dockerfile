FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY .env .env

COPY . .

RUN yarn migrate:prod

RUN yarn prisma:generate

EXPOSE 3000

CMD ["yarn", "dev"]