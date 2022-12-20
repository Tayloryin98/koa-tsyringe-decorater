#!/usr/bin/env bash

set -e

npm run build
npm run changelog
npm run changegiturl
npm run commit
npm version patch
git push --tags
git push