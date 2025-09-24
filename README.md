# Proyecto: Gestión de Citas Médicas (Microservicios)

## Resumen
Sistema de gestión de citas médicas que implementa:

- **Microservicios**: citas, pacientes y notificaciones.
- **Publicador–Suscriptor (Pub/Sub)** con RabbitMQ.
- **Inyección de dependencias (Dependency Injection)**.
- **Arquitectura Hexagonal** (Ports & Adapters).



## Requisitos

- **Docker** y **Docker Compose** (para levantar todo el sistema)
- **Node.js** (opcional, solo si quieres ejecutar servicios individualmente sin Docker)



## Levantar el sistema completo

Desde la raíz del proyecto (donde está `docker-compose.yml`):

```bash
docker compose up --build
```

Servicios levantados:

| Servicio | Puerto | Descripción |
|----------|-------|-------------|
| Postgres | 5432  | Base de datos |
| RabbitMQ | 5672  | Broker de mensajes |
| RabbitMQ UI | 15672 | Interfaz web de RabbitMQ |
| citas-service | 3000 | Microservicio de gestión de citas |
| pacientes-service | 3001 | Microservicio de gestión de pacientes |
| notificaciones-service | 3002 | Escucha eventos y muestra notificaciones |



## Probar los servicios

### Crear una cita
```bash
curl -X POST http://localhost:3000/appointments   -H "Content-Type: application/json"   -d '{"patientName":"Juan Perez","doctor":"Dra. Ruiz","scheduledAt":"2025-10-05T10:00:00Z"}'
```

### Listar citas
```bash
curl http://localhost:3000/appointments
```

### Crear un paciente
```bash
curl -X POST http://localhost:3001/patients   -H "Content-Type: application/json"   -d '{"name":"Juan Perez","email":"juan@mail.com"}'
```

### Listar pacientes
```bash
curl http://localhost:3001/patients
```



## Probar Pub/Sub

1. Crea una cita usando `POST /appointments`.
2. Observa los **logs del contenedor `notificaciones-service`**:
   - Se mostrará un mensaje indicando que el evento `appointment.created` fue recibido.
3. Abre la **UI de RabbitMQ**: `http://localhost:15672` (usuario: `guest`, contraseña: `guest`)
   - Verifica exchanges y queues.



## Estructura del proyecto

Cada microservicio sigue el patrón:

- `domain/` → modelos de negocio
- `ports/` → interfaces
- `adapters/` → adaptadores de DB y MQ
- `di/` → configuración de inyección de dependencias
- `app/routes/` → endpoints HTTP


## Notas finales

- Proyecto diseñado para ser **simple y entendible**, ideal para estudiar patrones de arquitectura.
- Puedes usar Docker para levantar todo, o ejecutar servicios individualmente con Node.js si lo prefieres.
