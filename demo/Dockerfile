# Fase de construcción para el backend
FROM maven:3.8.4-openjdk-17-slim AS backend-builder
WORKDIR /app
COPY settings.xml /root/.m2/settings.xml
COPY pom.xml .
COPY src ./src

RUN apt-get update && apt-get install -y curl
RUN curl -I https://repo.maven.apache.org/maven2
RUN ls -la /app

RUN mvn clean package -DskipTests

# Fase de construcción para el frontend
FROM node:16 AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend/ ./

# Asegúrate de que la variable de entorno se pase correctamente durante la construcción
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

RUN npm run build

# Mueve los archivos generados en la build al directorio estático
WORKDIR /app
RUN mkdir -p src/main/resources/static
RUN mv frontend/build/* src/main/resources/static/

# Fase de ejecución
FROM openjdk:17-slim
WORKDIR /app
COPY --from=backend-builder /app/target/*.war ./app.war
COPY --from=frontend-builder /app/src/main/resources/static ./static
EXPOSE 8080

# Asegura la variable de entorno en tiempo de ejecución
ENV REACT_APP_API_URL=${REACT_APP_API_URL}

CMD ["java", "-jar", "app.war"]
