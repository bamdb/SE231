#!/bin/sh
ps -ef | grep java | grep -v grep | awk '{print $2}' | xargs kill -9
git pull
sleep 20
cd config-server
nohup mvn spring-boot:run > bamdb.log &
sleep 10
echo 'config-server deployed'
cd ../registry
nohup mvn spring-boot:run > bamdb.log &
sleep 10
echo 'registry deployed'
cd ../user-service
nohup mvn spring-boot:run > bamdb.log &
sleep 10
echo 'user-service deployed'
cd ../item-service
nohup mvn spring-boot:run > bamdb.log &
sleep 10
echo 'item-service deployed'
cd ../activity-service
nohup mvn spring-boot:run > bamdb.log &
sleep 10
echo 'activity-service deployed'
cd ../rating-service
nohup mvn spring-boot:run > bamdb.log &
sleep 10
echo 'rating-service deployed'
cd ../topic-service
nohup mvn spring-boot:run > bamdb.log &
sleep 10
echo 'topic-service deployed'
cd ../friend-service
nohup mvn spring-boot:run > bamdb.log &
sleep 10
echo 'friend-service deployed'
cd ../comment-service
nohup mvn spring-boot:run > bamdb.log &
sleep 10
echo 'comment-service deployed'
cd ../image-service
nohup mvn spring-boot:run > bamdb.log &
sleep 10
echo 'image-service deployed'
cd ../message-service
nohup mvn spring-boot:run > bamdb.log &
sleep 10
echo 'message-service deployed'
cd ../gateway
nohup mvn spring-boot:run > bamdb.log &
sleep 10
echo 'gateway deployed'
cd ..
echo 'deploy completed'
