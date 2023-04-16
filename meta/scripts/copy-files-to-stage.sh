#!/bin/bash

set -e;

dir=$1

cp "README.md" ./meta/${dir}

cp "package.json" "package-lock.json" ./meta/${dir}

cp ".eslintrc.cjs" ".gitignore" ./meta/${dir}

cp "tsconfig.json" "vite.config.js" ./meta/${dir}

cp "index.html" ./meta/${dir}

cp -r "src" ./meta/${dir}


