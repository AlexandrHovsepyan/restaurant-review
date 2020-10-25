FROM node:alpine
VOLUME ["/home/app"]
EXPOSE 5000 9229
COPY package.json /home/
RUN chmod -R 0644 /home/
WORKDIR /home/
RUN npm cache clean --force
RUN npm install
CMD npm run start-docker
