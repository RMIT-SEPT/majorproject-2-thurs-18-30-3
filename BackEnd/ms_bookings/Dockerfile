FROM maven:3.5.2-jdk-8-alpine AS MAVEN_BUILD
MAINTAINER MJ Danny
COPY pom.xml ./
COPY src ./
COPY src src
RUN mvn package
FROM openjdk:8-jre-alpine
VOLUME /tmp
WORKDIR /app
COPY --from=MAVEN_BUILD /target/ms_bookings-0.0.1-SNAPSHOT.jar /app/
ENTRYPOINT ["java", "-jar","ms_bookings-0.0.1-SNAPSHOT.jar"]