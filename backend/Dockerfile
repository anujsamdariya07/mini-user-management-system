FROM node:20-alpine

WORKDIR /app

RUN npm install -g pnpm@10.18.3

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --prod

COPY . .

EXPOSE 5000

ENV NODE_ENV=production

CMD ["node", "src/index.js"]
