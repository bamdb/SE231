FROM adoptopenjdk/openjdk11:alpine
VOLUME /tmp
COPY ./wait-for-it.sh wait-for-it.sh
COPY ./target/activity-service.jar app.jar
EXPOSE 8090
ENTRYPOINT ["/wait-for-it.sh","localhost:8888","-t 0 --","java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]
