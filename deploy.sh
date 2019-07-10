##!/bin/sh
#ps -ef | grep java | grep -v grep | awk '{print $2}' | xargs kill -9
#sleep 5
#cd config-server
#nohup mvn spring-boot:run > bamdb.log &
#sleep 50
#echo 'config-server deployed'
#cd ../registry
#nohup mvn spring-boot:run > bamdb.log &
#sleep 50
#echo 'registry deployed'
#cd ../user-service
#nohup mvn spring-boot:run > bamdb.log &
#sleep 5
#echo 'user-service deployed'
#cd ../item-service
#nohup mvn spring-boot:run > bamdb.log &
#sleep 5
#echo 'item-service deployed'
#cd ../activity-service
#nohup mvn spring-boot:run > bamdb.log &
#sleep 5
#echo 'activity-service deployed'
#cd ../rating-service
#nohup mvn spring-boot:run > bamdb.log &
#sleep 5
#echo 'rating-service deployed'
#cd ../topic-service
#nohup mvn spring-boot:run > bamdb.log &
#sleep 5
#echo 'topic-service deployed'
#cd ../friend-service
#nohup mvn spring-boot:run > bamdb.log &
#sleep 5
#echo 'friend-service deployed'
#cd ../comment-service
#nohup mvn spring-boot:run > bamdb.log &
#sleep 5
#echo 'comment-service deployed'
#cd ../image-service
#nohup mvn spring-boot:run > bamdb.log &
#sleep 5
#echo 'image-service deployed'
#cd ../message-service
#nohup mvn spring-boot:run > bamdb.log &
#sleep 5
#echo 'message-service deployed'
#cd ../gateway
#nohup mvn spring-boot:run > bamdb.log &
#sleep 5
#echo 'gateway deployed'
#cd ..
#echo 'deploy completed'
