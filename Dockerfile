FROM maven:3.5.2-jdk-8-alpine AS MAVEN_BUILD
MAINTAINER MJ Danny
# copy just copies files from another location, we don't need to do this for pom.xml as it is already on the front dir
RUN mvn package
FROM openjdk:8-jre-alpine
WORKDIR /app
COPY --from=MAVEN_BUILD /build/target/spring-boot-demo-0.0.1.jar /app/
ENTRYPOINT ["java", "-jar", "spring-boot-demo-0.0.1.jar"]