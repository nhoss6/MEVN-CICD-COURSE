FROM node:20.19.0-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

FROM node:20.19.0-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app . .

EXPOSE 5000

CMD ["npm", "start"]
