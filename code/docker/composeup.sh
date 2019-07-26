#!/bin/sh
# docker-compose stop
# docker-compose -f docker-compose-config.yml stop
# docker-compose -f docker-compose-registry.yml stop
docker stack rm bamdb
# docker-compose rm -f
# docker-compose -f docker-compose-config.yml rm -f
# docker-compose -f docker-compose-registry.yml rm -f
docker-compose pull
docker-compose -f docker-compose-config.yml pull
docker-compose -f docker-compose-registry.yml pull
docker stack deploy --compose-file=docker-compose-config.yml bamdb
sleep 50
echo "config up"
docker stack deploy --compose-file=docker-compose-registry.yml bamdb
sleep 50
echo "registry up"
docker stack deploy --compose-file=docker-compose.yml bamdb
echo "done"
