#!/bin/bash

cp -r /usr/src/cache/node_modules/. /usr/src/docs/node_modules/
exec npm run start
