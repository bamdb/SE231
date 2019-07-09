#!/bin/sh
ps -ef | grep java | grep -v grep | awk '{print $2}' | xargs kill -9
cd config-server
sudo mvn spring-boot:run > bamdb.log &
sleep 10
cd ../registry
sudo mvn spring-boot:run > bamdb.log &
sleep 10
cd ../user-service
sudo mvn spring-boot:run > bamdb.log &
sleep 10
cd ../item-service
sudo mvn spring-boot:run > bamdb.log &
sleep 10
cd ../activity-service
sudo mvn spring-boot:run > bamdb.log &
sleep 10
cd ../rating-service
sudo mvn spring-boot:run > bamdb.log &
sleep 10
cd ../topic-service
sudo mvn spring-boot:run > bamdb.log &
sleep 10
cd ../friend-service
sudo mvn spring-boot:run > bamdb.log &
sleep 10
cd ../comment-service
sudo mvn spring-boot:run > bamdb.log &
sleep 10
cd ../image-service
sudo mvn spring-boot:run > bamdb.log &
sleep 10
cd ../message-service
sudo mvn spring-boot:run > bamdb.log &
sleep 10
cd ../gateway
sudo mvn spring-boot:run > bamdb.log &
sleep 10
cd ..
exit 1
