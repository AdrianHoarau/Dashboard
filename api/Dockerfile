# SERVER BUILD
FROM node:10.19.0
RUN mkdir -p /usr/src/app/api
WORKDIR /usr/src/app/api
COPY package.json /usr/src/app/api
RUN npm install
COPY . /usr/src/app/api
EXPOSE 8080
CMD [ "npm", "start" ]