# Etapa 1: Build da Aplicação
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app

# Copia apenas o pom.xml para baixar as dependências
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copia o código fonte e compila o projeto
COPY src ./src
RUN mvn clean package -DskipTests

# Etapa 2: Execução da Aplicação
FROM eclipse-temurin:21-jre-alpine
VOLUME /tmp
COPY --from=build /app/target/*.jar app.jar

# Expõe a porta padrão do Spring Boot
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]