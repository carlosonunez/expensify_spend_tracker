FROM node:13.5-alpine
MAINTAINER Carlos Nunez <dev@carlosnunez.me>
ENV YAML_BIN_VERSION=2.4.1
ENV YQ_URL="https://github.com/mikefarah/yq/releases/download/${YAML_BIN_VERSION}/yq_linux_amd64"

RUN npm install -g @google/clasp
RUN apk add bats gomplate jq
RUN wget -O /usr/local/bin/yq "$YQ_URL" && chmod +x /usr/local/bin/yq
