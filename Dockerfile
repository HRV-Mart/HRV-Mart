# Dockerfile

# base image
FROM node:alpine
ENV BACKEND_URL=http://localhost:3002
ENV APPLICATION_URL=http://localhost:3000
# create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# copy source files
COPY . /usr/src

# install dependencies
RUN npm install

# start app
RUN npm run build
EXPOSE 3000
CMD npm run start
