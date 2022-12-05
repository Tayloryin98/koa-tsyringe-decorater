#!/usr/bin/env bash

set -e

rm -rf docker/app
rm -rf deploy.tar.gz
mkdir docker/app
npm run build
cp -r lib docker/app/
cp -r etc docker/app/
cp .npmrc docker/app/
cp package.json docker/app/
cp package-lock.json  docker/app/
tar -zcvf deploy.tar.gz docker