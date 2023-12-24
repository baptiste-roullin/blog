#!/usr/bin/env zsh

cp -n -r  ./src/posts/**/*.(png|webp|gif|mp4|jpg|jpeg) ./src/assets/images/* ./src/assets/UI/*  ./src/assets/imagesToProcess/
cp dist/.vite/manifest.json ./src/_data