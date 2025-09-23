# Proyecto: Gestión de Citas Médicas (Microservicios)

## Resumen
Proyecto de ejemplo que implementa:
- Microservicios (citas, pacientes, notificaciones)
- Publicador–Suscriptor (RabbitMQ)
- Inyección de dependencias (simple container JS)
- Arquitectura Hexagonal (domain / ports / adapters)

---

## Requisitos
- Docker & Docker Compose
- Node.js (si deseas correr servicios local sin Docker)

---

## Levantar el sistema (Docker)
Desde la raíz del repositorio:

```bash
docker compose up --build
```

Servicios:
- Citas service: http://localhost:3000
- Pacientes service: http://localhost:3001
- Notificaciones (consumer): http://localhost:3002 (no tiene endpoints principales)
- RabbitMQ Management UI: http://localhost:15672 (guest/guest)
- Postgres: localhost:5432 (postgres/postgres, DB= citasdb)

---

## Endpoints principales

### Citas Service (puerto 3000)
- `POST /appointments` — crear cita
  ```bash
  curl -X POST http://localhost:3000/appointments     -H "Content-Type: application/json"     -d '{"patientName":"Juan Perez","doctor":"Dr Gomez","scheduledAt":"2025-10-05T10:00:00Z"}'
  ```
  Respuesta: 201 y objeto creado.

- `GET /appointments` — listar citas
  ```bash
  curl http://localhost:3000/appointments
  ```

### Pacientes Service (puerto 3001)
- `POST /patients` — crear paciente
  ```bash
  curl -X POST http://localhost:3001/patients     -H "Content-Type: application/json"     -d '{"name":"Juan Perez","email":"juan@mail.com"}'
  ```
- `GET /patients` — listar pacientes
  ```bash
  curl http://localhost:3001/patients
  ```

---

## Qué comprobar para la prueba de Pub/Sub
1. Levanta todo con `docker compose up --build`.
2. Ejecuta `POST /appointments` (ver arriba).
3. Observa logs del contenedor `notificaciones-service` (debería imprimir el evento recibido).
4. Abre RabbitMQ Management UI para ver exchanges/queues: http://localhost:15672

---

## Estructura del código
Cada servicio sigue el patrón: `domain/` (modelo), `ports/` (interfaces), `adapters/` (DB o MQ), `di/` (wire-up), `app/routes` (HTTP).

---

## Subir a GitHub
1. Crea un repo nuevo en GitHub.
2. En tu carpeta local:
   ```bash
   git add .
   git commit -m "Initial commit - microservices cita"
   git branch -M main
   git remote add origin <URL del repo>
   git push -u origin main
   ```

---

## Capturas y documentación
Para la entrega en PDF: toma capturas de:
- Logs de `notificaciones-service` mostrando evento recibido.
- Respuesta 201 al crear cita (Postman o curl).
- RabbitMQ UI mostrando exchange `appointments`.

---

## Notas
- El proyecto está intencionalmente simple para que puedas entender los patrones. La inyección de dependencias se hace con un `di/container.js` por servicio.
