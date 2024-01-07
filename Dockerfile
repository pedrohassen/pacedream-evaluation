FROM node:18.19-alpine

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . . 

EXPOSE 3001

ENTRYPOINT [ "npm", "run", "start" ]