FROM node:14

WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm install
COPY . .
EXPOSE 3000
VOLUME ["/app/node_modules"]
CMD [ "npm", "start" ]
