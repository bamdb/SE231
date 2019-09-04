FROM adoptopenjdk/openjdk11:alpine
VOLUME /tmp
COPY ./target/registry.jar app.jar
EXPOSE 8761
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]
