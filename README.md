# OficinaAPI

Back-end application developed during a **university hackathon challenge**, with the goal of building a functional CRUD solution in approximately one day.

The project models a simple automotive workshop system with users and vehicles.

## Challenge

The objective was to design and implement a working application under a short deadline, applying concepts of:

- REST APIs
- CRUD operations
- Layered architecture
- Data persistence
- Validation
- Relationship between application entities

## Technologies

- Java 21
- Spring Boot 4
- Spring Web MVC
- Spring Data JPA
- Spring Data JDBC
- Bean Validation
- MySQL / PostgreSQL drivers
- Thymeleaf
- Maven
- Docker

## Project structure

```text
src/main/java/OficinaAPI
├── controller
├── model
├── repository
└── service
```

The project separates HTTP endpoints, business logic, persistence and domain models into dedicated layers.

## Main resources

### Vehicles

The API provides CRUD operations for vehicles:

```http
POST   /api/carros/usuario/{usuarioId}
GET    /api/carros
GET    /api/carros/{id}
PUT    /api/carros/{id}
DELETE /api/carros/{id}
```

### Users

User endpoints include creation and listing:

```http
POST /api/usuario
GET  /api/usuario
```

The project also contains web routes for dashboard, login and registration views.

## What this project demonstrates

- Ability to structure a Spring Boot project quickly
- REST endpoint implementation
- Controller / Service / Repository separation
- JPA-based persistence
- Bean Validation
- CRUD implementation
- Working under a short development deadline

## Context

This project was created for a university hackathon and is especially relevant to my portfolio because it demonstrates my ability to turn requirements into a functional back-end solution within a limited amount of time.

## Author

**Arthur Lima Gonçalves**

- GitHub: https://github.com/Arthyxx
- LinkedIn: https://www.linkedin.com/in/arthur-gonçalves-3957a4233/
