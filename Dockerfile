FROM node:latest
RUN npm i -g pnpm
WORKDIR /src
COPY package.json .
COPY pnpm-lock.yaml .
RUN pnpm install
COPY . .
RUN pnpm build

FROM node:slim
WORKDIR /server
COPY --from=0 /src/build .
CMD [ "node", "index.js" ]