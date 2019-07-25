#!/bin/sh
docker-compose stop
docker-compose -f docker-compose-config.yml stop
docker-compose -f docker-compose-registry.yml stop
docker-compose rm -f
docker-compose -f docker-compose-config.yml rm -f
docker-compose -f docker-compose-registry.yml rm -f
docker-compose pull
docker-compose -f docker-compose-config.yml pull
docker-compose -f docker-compose-registry.yml pull
docker-compose -f docker-compose-config.yml up -d
sleep 50
echo "config up"
docker-compose -f docker-compose-registry.yml up -d
sleep 50
echo "registry up"
docker-compose up -d
echo "done"
