#!/bin/sh
ps -ef | grep java | grep -v grep | awk '{print $2}' | xargs kill -9
cd ~/bamdb/SE231
cd config-server
nohup mvn clean spring-boot:run > bamdb.log &
sleep 50
echo 'config deployed'
cd ../registry
nohup mvn clean spring-boot:run -Dspring.profiles.active=aliyun1 > bamdb.log &
sleep 50
echo 'registry deployed'
cd ../auth-service
nohup mvn clean spring-boot:run -Dspring.profiles.active=aliyun1 > bamdb.log &
sleep 5
echo 'auth-service deployed'
cd ../item-service
nohup mvn clean spring-boot:run -Dspring.profiles.active=aliyun1 > bamdb.log &
sleep 5
echo 'item-service deployed'
cd ../image-service
nohup mvn clean spring-boot:run -Dspring.profiles.active=aliyun1 > bamdb.log &
sleep 5
echo 'image-service deployed'
cd ../activity-service
nohup mvn clean spring-boot:run -Dspring.profiles.active=aliyun1 > bamdb.log &
sleep 5
echo 'activity-service deployed'
cd ../rating-service
nohup mvn clean spring-boot:run -Dspring.profiles.active=aliyun1 > bamdb.log &
sleep 5
echo 'rating-service deployed'
cd ../topic-service
nohup mvn clean spring-boot:run -Dspring.profiles.active=aliyun1 > bamdb.log &
sleep 5
echo 'topic-service deployed'
cd ../comment-service
nohup mvn clean spring-boot:run -Dspring.profiles.active=aliyun1 > bamdb.log &
sleep 5
echo 'comment deployed'
cd ../message-service
nohup mvn clean spring-boot:run -Dspring.profiles.active=aliyun1 > bamdb.log &
sleep 5
echo 'message deployed'
cd ../friend-service
nohup mvn clean spring-boot:run -Dspring.profiles.active=aliyun1 > bamdb.log &
sleep 5
echo 'friend deployed'
cd ../gateway
nohup mvn clean spring-boot:run -Dspring.profiles.active=aliyun1 > bamdb.log &
sleep 5
echo 'gateway deployed'
