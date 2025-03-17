ARG DEBIAN_DIST=bullseye

FROM rust:${DEBIAN_DIST} as builder
WORKDIR /usr/src/codetypo
COPY . .
RUN cargo install --path ./crates/codetypo-cli

FROM debian:${DEBIAN_DIST}-slim
COPY --from=builder /usr/local/cargo/bin/codetypo /usr/local/bin/codetypo
ENTRYPOINT ["codetypo"]
CMD ["--help"]
