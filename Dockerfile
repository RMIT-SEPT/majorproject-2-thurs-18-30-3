FROM maven:3.5.2-jdk-8-alpine AS MAVEN_BUILD
MAINTAINER MJ Danny
COPY pom.xml ./
COPY BackEnd /BackEnd/
COPY FrontEnd/yarn.lock ./
COPY FrontEnd /FrontEnd/
# copy just copies files from another location, we don't need to do this for pom.xml as it is already on the front dir
RUN mvn package
# RUN yarn run
FROM openjdk:8-jre-alpine
# COPY --from=MAVEN_BUILD target/spring-boot-demo-0.0.1.jar /app/
COPY --from=MAVEN_BUILD BackEnd/ms_bookings/target/ms_bookings-0.0.1-SNAPSHOT.jar /BackEnd/
COPY --from=MAVEN_BUILD BackEnd/ms_profiles/target/ms_profiles-0.0.1-SNAPSHOT.jar /BackEnd/
COPY --from=MAVEN_BUILD BackEnd/ms_service/ms_service/target/ms_service-0.0.1-SNAPSHOT.jar /BackEnd/
EXPOSE 8080
ENTRYPOINT ["java", "-jar","ms_bookings-0.0.1-SNAPSHOT.jar","ms_profiles-0.0.1-SNAPSHOT.jar","ms_service-0.0.1-SNAPSHOT.jar"]

