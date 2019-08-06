FROM adoptopenjdk/openjdk11:alpine
VOLUME /tmp
COPY ./target/comment-service.jar app.jar
EXPOSE 8090
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]
