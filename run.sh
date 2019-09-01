#!/bin/bash

trap close SIGINT SIGTERM

# Remove docker containers on exit
close () {
  docker-compose -f docker-compose.yml -f docker-compose.development.yml down
}

# Build development docker containers
docker_development () {
  docker-compose  -f docker-compose.yml -f docker-compose.development.yml up --build
}

# Execute npm script to enable typescript to track changes
watch_backend () {
  docker-compose exec backend npm run watch
}

# Execute npm script to lint backend files
lint_backend () { 
  cd app/backend && npm run lint
}

# Execute npm script to seed database with basic data
seed_db () {
  docker-compose exec backend npm run seed
}

test_backend () {
  docker-compose exec backend npm run test
}

(
  if [ $# -eq 0 ]; then
    echo 'Starting Docker Development!'
    docker_development
  else
    if [ $1 == '--watch_backend' ]; then
      watch_backend
    elif [ $1 == '--close' ]; then
      close
    elif [ $1 == '--lint_backend' ]; then
      lint_backend
    elif [ $1 == '--seed' ]; then
      seed_db
    elif [ $1 == '--test' ]; then
      test_backend
    elif [ $1 == '--docs' ]; then
      docker restart podcastapp_api-documentation_1
    else
      echo "Acceptable second arguments is : [--watch_backend, --close, --lint_backend]."
      echo "--watch_backend: run TypeScript compiler in watch mode inside API container"
      echo "--close: run bash command to close docker containers"
      echo "--lint_backend: run npm script to lint backend files"
      echo "--seed: run npm script to seed database"
      echo "--docs: reload documentation server after docs update"
    fi
  fi
)
