#!/bin/bash
(
  echo 'Starting backend'
  cp -r /usr/src/cache/node_modules/. /usr/src/app/node_modules/
  npm run build
  if [ $# -eq 0 ]; then
    echo 'Staging entrypoint'
    exec npm run start
  else
    if [ $1 == '--dev' ]; then
      echo 'Development entrypoint'
      exec npm run start:dev
    fi
  fi
)