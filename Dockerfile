FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)

RUN npm install -g serve

COPY package*.json ./
COPY yarn.lock ./

RUN npm i -g yarn

RUN yarn
# If you are building your code for production
# RUN npm install --only=production

COPY . .

RUN yarn run build

EXPOSE 5000

ENV NODE_ENV production

CMD [ "serve", "-s", "build" ]