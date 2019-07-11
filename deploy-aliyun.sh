#!/bin/sh
ps -ef | grep java | grep -v grep | awk '{print $2}' | xargs kill -9
cd ~/bamdb/SE231
cd registry
nohup mvn spring-boot:run -Drun.profiles=ubuntularge > bamdb.log &
sleep 10
echo 'registry deployed'
cd ../user-service
nohup mvn spring-boot:run -Drun.profiles=ubuntularge > bamdb.log &
sleep 5
echo 'user-service deployed'
cd ../item-service
nohup mvn spring-boot:run -Drun.profiles=ubuntularge > bamdb.log &
sleep 5
echo 'item-service deployed'
cd ../image-service
nohup mvn spring-boot:run -Drun.profiles=ubuntularge > bamdb.log &
sleep 5
echo 'image-service deployed'
cd ../activity-service
nohup mvn spring-boot:run -Drun.profiles=ubuntularge > bamdb.log &
sleep 5
echo 'activity-service deployed'
cd ../rating-service
nohup mvn spring-boot:run -Drun.profiles=ubuntularge > bamdb.log &
sleep 5
echo 'rating-service deployed'
cd ../topic-service
nohup mvn spring-boot:run -Drun.profiles=ubuntularge > bamdb.log &
sleep 5
cd ../comment
nohup mvn spring-boot:run -Drun.profiles=ubuntularge > bamdb.log &
sleep 5
echo 'comment deployed'
cd ../message
nohup mvn spring-boot:run -Drun.profiles=ubuntularge > bamdb.log &
sleep 5
echo 'message deployed'
cd ../friend
nohup mvn spring-boot:run -Drun.profiles=ubuntularge > bamdb.log &
sleep 5
echo 'friend deployed'
cd ../gateway
nohup mvn spring-boot:run -Drun.profiles=ubuntularge > bamdb.log &
sleep 5
echo 'gateway deployed'
