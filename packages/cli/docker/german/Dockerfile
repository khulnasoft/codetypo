FROM ghcr.io/khulnasoft/codetypo:8.4.1

WORKDIR /app
ENV HOME=/home
RUN npm install @codetypo/dict-de-de@3.2.0
RUN codetypo-cli link add @codetypo/dict-de-de

WORKDIR /workdir
