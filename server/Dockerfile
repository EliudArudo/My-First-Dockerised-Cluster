FROM node:alpine

WORKDIR /usr/app

COPY ./package.json ./package.json

RUN npm install && npm cache clean --force

COPY ./ ./

EXPOSE 3001

CMD ["npm", "start"]