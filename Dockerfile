#Build StarTest stuff
FROM rust:latest
RUN cargo install wasm-pack
WORKDIR /build
COPY ./src/StarTest2/rust .
RUN wasm-pack build --release

FROM node:latest
RUN npm i -g pnpm
#inter = Intermediate so I don't get confused.
WORKDIR /inter
COPY package.json .
COPY pnpm-lock.yaml .
COPY ./src/StarTest2 ./src/StarTest2
COPY --from=0 /build/pkg ./src/StarTest2/rust/pkg
#Optimise WASM binary.
RUN pnpm install -D binaryen
RUN pnpm wasm-opt -Oz -o ./src/StarTest2/rust/pkg/startest2_rust_bg.wasm ./src/StarTest2/rust/pkg/startest2_rust_bg.wasm
#Run recursive install.
RUN pnpm install -r
COPY . .
RUN pnpm build
FROM node:slim
WORKDIR /server
COPY --from=1 /inter/package.json .
COPY --from=1 /inter/node_modules ./node_modules
COPY --from=1 /inter/build ./build
#This runs the server located in the build dir (not build it).
CMD [ "node", "build" ]