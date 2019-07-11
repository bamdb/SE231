#!/bin/sh
ps -ef | grep java | grep -v grep | awk '{print $2}' | xargs kill -9
cd ~/SE231
sleep 5
cd config-server
nohup mvn spring-boot:run > bamdb.log &
sleep 50
echo 'config-server deployed'
cd ../registry
nohup mvn spring-boot:run -Dspring.profiles.active=ubuntularge > bamdb.log &
sleep 50
echo 'registry deployed'
cd ../user-service
nohup mvn spring-boot:run -Dspring.profiles.active=ubuntularge > bamdb.log &
sleep 5
echo 'user-service deployed'
cd ../item-service
nohup mvn spring-boot:run -Dspring.profiles.active=ubuntularge > bamdb.log &
sleep 5
echo 'item-service deployed'
cd ../image-service
nohup mvn spring-boot:run -Dspring.profiles.active=ubuntularge > bamdb.log &
sleep 5
echo 'image-service deployed'
cd ../gateway
nohup mvn spring-boot:run -Dspring.profiles.active=ubuntularge > bamdb.log &
sleep 5
echo 'gateway deployed'
