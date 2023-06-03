#!/usr/bin/env bash

set -e

npm run build

rm -rf docker/app/lib
rm -rf docker/deploy.tar.gz
mkdir docker/app/lib
cp -r lib docker/app/
cp .npmrc docker/app/
cp package.json docker/app/
cp package-lock.json  docker/app/

cd docker

tar -zcvf deploy.tar.gz app/ docker-compose.yml install.sh 