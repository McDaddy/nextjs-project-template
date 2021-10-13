#!dice
FROM registry.erda.cloud/retag/node:12.19.0-alpine3.9

# Set special timezone
RUN echo "Asia/Shanghai" | tee /etc/timezone

WORKDIR /usr/src/app

COPY .  .
RUN npm i pnpm -g
RUN pnpm i
RUN npm run build

ENV NODE_ENV=production
ENV PORT=80

CMD npm run prod-start
