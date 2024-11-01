FROM node:14.17.5-alpine AS builder
WORKDIR /app
COPY ./yarn.lock ./package.json  ./
RUN yarn install
COPY . .
RUN yarn build

FROM node:14.17.5-alpine AS runner
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 80
CMD ["yarn", "start"]
