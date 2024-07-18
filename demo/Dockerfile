# Fase de construcción
FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Fase de ejecución
FROM openjdk:17-slim
COPY --from=build /app/target/*.war app.war
EXPOSE 8080
CMD ["java", "-jar", "app.war"]
