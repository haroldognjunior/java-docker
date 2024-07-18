# Fase de construcción para el backend
FROM maven:3.8.4-openjdk-17-slim AS backend-builder
WORKDIR /build
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Fase de construcción para el frontend
FROM node:16 AS frontend-builder
WORKDIR /app
COPY frontend/package.json ./
COPY frontend/package-lock.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Fase de ejecución
FROM openjdk:17-slim
WORKDIR /app
COPY --from=backend-builder /build/target/*.war ./app.war
# Copiar los archivos estáticos construidos en una ubicación accesible por Spring Boot
COPY --from=frontend-builder /build/build /app/static
EXPOSE 8080
CMD ["java", "-jar", "app.war"]
