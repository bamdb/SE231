docker stack rm bamdb_rabbitmq
docker stack deploy --compose-file=docker-compose-rabbitmq.yml bamdb_rabbitmq
sleep 5
docker exec -it --user root $(docker ps -q -f name=bamdb_rabbitmq) rabbitmqctl stop_app
docker exec -it --user root $(docker ps -q -f name=bamdb_rabbitmq) rabbitmqctl reset
docker exec -it --user root $(docker ps -q -f name=bamdb_rabbitmq) rabbitmqctl join_cluster rabbit@bamdb
docker exec -it --user root $(docker ps -q -f name=bamdb_rabbitmq) rabbitmqctl start_app
