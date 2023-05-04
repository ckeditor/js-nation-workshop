#!/bin/bash

set -e

stage=$1
stages=(start act-i act-ii act-iii act-iv act-v)


if [ -z "$stage" ]
then
  stage="start"
fi

if [[ " ${stages[@]} " =~ " ${stage} " ]]
then
  echo "Resetting to $stage stage..."
else
  echo "No stage: $stage"
  exit 1
fi



echo "Removing files..."
rm -rf \
"node_modules" \
".eslintrc.cjs" \
"index.html" \
"package-lock.json" \
"package.json" \
"src" \
"tsconfig.json" \
"vite.config.js" 2> /dev/null

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
