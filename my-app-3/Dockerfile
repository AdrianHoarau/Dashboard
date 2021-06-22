FROM node:lts-alpine

WORKDIR /app/my-app-3

COPY package*.json ./

RUN npm install

EXPOSE 80

CMD ["npm", "run", "serve"]