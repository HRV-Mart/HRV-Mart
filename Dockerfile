# Dockerfile

# base image
FROM node:alpine

ARG NEXT_PUBLIC_APPWRITE_ENDPOINT=http://localhost/v1
ARG NEXT_PUBLIC_APPWRITE_PROJECT_ID=PROJECT_ID


ENV NEXT_PUBLIC_APPWRITE_ENDPOINT=$NEXT_PUBLIC_APPWRITE_ENDPOINT
ENV NEXT_PUBLIC_APPWRITE_PROJECT_ID=$NEXT_PUBLIC_APPWRITE_PROJECT_ID

ENV BACKEND_URL=http://localhost:3002
ENV NEXT_PUBLIC_APPLICATION_URL=http://localhost:3000


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
