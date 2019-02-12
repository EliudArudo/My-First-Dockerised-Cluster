FROM node:alpine as builder

WORKDIR /usr/app
COPY ./package.json ./
RUN npm install && npm cache clean --force
COPY . .
RUN npm run generate

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/app/dist /usr/share/nginx/html

