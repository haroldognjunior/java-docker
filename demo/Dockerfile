# Fase de construcción para el backend
FROM maven:3.8.4-openjdk-17-slim AS backend-builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Fase de construcción para el frontend
FROM node:16 AS frontend-builder
WORKDIR /app
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build
# Crear el directorio antes de intentar mover los archivos, asegurando el orden correcto
RUN mkdir -p ../src/main/resources/static
RUN mv build/* ../src/main/resources/static/

# Fase de ejecución
FROM openjdk:17-slim
WORKDIR /app
COPY --from=backend-builder /app/target/*.war ./app.war
COPY --from=frontend-builder /app/src/main/resources/static /app/static
EXPOSE 8080
CMD ["java", "-jar", "app.war"]
