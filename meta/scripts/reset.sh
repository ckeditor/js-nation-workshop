#!/bin/bash

set -e

stage=$1

echo "Removing files..."
rm -rf \
"node_modules" \
".eslintrc.cjs" \
"index.html" \
"package-lock.json" \
"package.json" \
"src" \
"tsconfig.json" \
"vite.config.js"

echo "Copying files from ${stage}..."
cp -r \
"./meta/${stage}/.eslintrc.cjs" \
"./meta/${stage}/index.html" \
"./meta/${stage}/package-lock.json" \
"./meta/${stage}/package.json" \
"./meta/${stage}/src" \
"./meta/${stage}/tsconfig.json" \
"./meta/${stage}/vite.config.js" \
.

echo "Installing dependencies..."
npm install
