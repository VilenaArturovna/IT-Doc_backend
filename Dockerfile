FROM node:16.20.2-alpine AS builder
WORKDIR /app
COPY ./yarn.lock ./package.json  ./
RUN yarn install
COPY . .
RUN yarn build

FROM node:16.20.2-alpine AS runner
WORKDIR /app
COPY --from=builder /app ./
ENTRYPOINT ["sh", "-c"]
CMD ["yarn migration:run && yarn start:dev"]

