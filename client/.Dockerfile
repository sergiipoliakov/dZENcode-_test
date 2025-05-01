FROM node:alpine
RUN rm -rf /home/app
RUN mkdir /home/app
WORKDIR /home/app