FROM node:7.7.2

# The base node image sets a very verbose log level.
ENV NPM_CONFIG_LOGLEVEL warn

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

# From here we load our application's code in, therefore the previous docker
# layer thats been cached will be used if possible
WORKDIR /opt/app
ADD . /opt/app
RUN cd /opt/app && npm run build

CMD [ "npm", "start" ]

EXPOSE 3000
