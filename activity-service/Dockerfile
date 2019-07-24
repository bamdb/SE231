FROM adoptopenjdk/openjdk11:alpine
VOLUME /tmp
COPY ./target/activity-service.jar app.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]
