#!/bin/sh
docker-compose -f docker-compose-config.yml up -d
sleep 20
echo "config up"
docker-compose -f docker-compose-registry.yml up -d
sleep 20
echo "registry up"
docker-compose up -d
echo "done"
