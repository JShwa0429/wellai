FROM node:16-alpine

WORKDIR /usr/src/client
COPY . /usr/src/client
COPY package.json /usr/src/client/package.json


# sh: react-scripts:not found
RUN npm i -g react-scripts

RUN npm i typescript
RUN npm i ts-node
# RUN npm link typescript

RUN npm install



CMD ["npm", "start"]

