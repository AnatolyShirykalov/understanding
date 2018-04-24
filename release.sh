#!/usr/bin/bash
yarn build
rsync -avz --progress build/ understanding@shirykalov.ru:/home/understanding/app/current/build
