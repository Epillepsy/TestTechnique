FROM node:alpine as build-stage
ARG MODE

WORKDIR /usr/src/app
COPY package*.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn build-$MODE

FROM nginxinc/nginx-unprivileged:alpine as run-stage
USER root
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
