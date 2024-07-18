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
RUN mkdir -p ../src/main/resources/static  # Crear el directorio antes de mover los archivos
RUN mv build/* ../src/main/resources/static/

# Fase de ejecución
FROM openjdk:17-slim
WORKDIR /app
COPY --from=backend-builder /app/target/*.war ./app.war
COPY --from=frontend-builder /app/src/main/resources/static /app/static  # Asegurarse de copiar desde la ubicación correcta
EXPOSE 8080
CMD ["java", "-jar", "app.war"]
