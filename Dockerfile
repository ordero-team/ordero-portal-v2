FROM node:16.20-alpine as buildContainer
#FROM node:alpine as buildContainer

COPY . /app
WORKDIR /app

RUN yarn install
RUN yarn lint

ENV PRODUCTION true
ENV HMR false

# dynamic ENV, will be replaced on running
ENV ENV_NAME %%ENV_NAME%%
ENV DEBUG %%DEBUG%%
ENV API_URL %%API_URL%%
ENV APP_NAME %%APP_NAME%%
ENV ENCRYPT_KEY %%ENCRYPT_KEY%%
ENV SENTRY_DSN %%SENTRY_DSN%%
ENV SOCKET_TYPE %%SOCKET_TYPE%%
ENV CENTRIFUGO_URL %%CENTRIFUGO_URL%%

RUN yarn run config
RUN yarn build

FROM nginx:alpine
COPY --from=buildContainer /app/dist/ordero-portal /app
COPY --from=buildContainer /app/docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=buildContainer /app/docker/mime.types /etc/nginx/mime.types
COPY --from=buildContainer /app/docker/gzip.conf /etc/nginx/gzip.conf
COPY --from=buildContainer /app/docker/start.sh /usr/local/bin/start

RUN chmod u+x /usr/local/bin/start

EXPOSE 9000/tcp

CMD ["/usr/local/bin/start"]
