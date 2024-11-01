FROM node:14.17.5-alpine AS builder
WORKDIR /app
COPY ./yarn.lock ./package.json  ./
RUN yarn install
COPY . .
RUN yarn build

FROM node:14.17.5-alpine AS runner
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3000
ENTRYPOINT ["sh", "-c"]
CMD ["yarn migration:run && yarn start:dev"]
