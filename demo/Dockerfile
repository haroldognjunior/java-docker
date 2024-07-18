# Fase de construcción para el frontend
FROM node:16 AS frontend-builder
WORKDIR /app
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend/ ./
# Crear el directorio antes de construir y mover los archivos
RUN mkdir -p ../src/main/resources/static
RUN npm run build
RUN mv build/* ../src/main/resources/static/

# Fase de ejecución
FROM openjdk:17-slim
WORKDIR /app
COPY --from=backend-builder /app/target/*.war ./app.war
COPY --from=frontend-builder /app/src/main/resources/static /app/static
EXPOSE 8080
CMD ["java", "-jar", "app.war"]
