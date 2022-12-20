#!/usr/bin/env bash

set -e

npm run build
npm run commit
npm version patch
npm run changelog
npm run changegiturl
git push --tags
git push