#!/bin/bash

set -e

rm -rf \
"node_modules" \
".eslintrc.cjs" \
"index.html" \
"package-lock.json" \
"package.json" \
"src" \
"tsconfig.json" \
"vite.config.js"

cp -r \
"./meta/start/.eslintrc.cjs" \
"./meta/start/index.html" \
"./meta/start/package-lock.json" \
"./meta/start/package.json" \
"./meta/start/src" \
"./meta/start/tsconfig.json" \
"./meta/start/vite.config.js" \
.

npm install
