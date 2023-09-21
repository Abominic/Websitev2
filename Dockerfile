#Build StarTest stuff
FROM rust:latest
RUN cargo install wasm-pack
WORKDIR /build
COPY ./src/StarTest2/rust/* .
RUN wasm-pack build

FROM node:latest
RUN npm i -g pnpm
WORKDIR /src
COPY package.json .
COPY pnpm-lock.yaml .
COPY ./src/StarTest2 ./src/StarTest2
COPY --from=1 /build/pkg ./src/StarTest2/rust/pkg
#Run recursive install.
RUN pnpm install -r
COPY . .
RUN pnpm build

FROM node:slim
WORKDIR /server
COPY --from=1 /src .
#This runs the server located in the build dir (not build it).
CMD [ "node", "build" ]