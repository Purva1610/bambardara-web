# PostgreSQL Docker Setup

This project uses PostgreSQL 17 running in Docker for local development.

## Prerequisites

- Docker Desktop installed and running
- Docker Compose (included with Docker Desktop)

## Quick Start

### 1. Start PostgreSQL

```bash
docker-compose up -d
```

This will:
- Pull PostgreSQL 17 (bookworm) image if not present
- Create a container named `bambardara-postgres`
- Expose PostgreSQL on port `5433` (to avoid conflicts with local installations)
- Create a persistent volume for data storage

### 2. Verify PostgreSQL is Running

```bash
docker ps
```

You should see:
```
CONTAINER ID   IMAGE                  COMMAND                  STATUS                 PORTS
...            postgres:17-bookworm   "docker-entrypoint.s…"   Up (healthy)          0.0.0.0:5433->5432/tcp
```

### 3. Check Logs

```bash
docker logs bambardara-postgres
```

## Database Configuration

**Connection Details:**
- **Host:** `localhost` or `127.0.0.1`
- **Port:** `5433` (external), `5432` (internal)
- **Database:** `bambardara`
- **User:** `bambardara`
- **Password:** `bambardara_dev`

**JDBC URL:**
```
jdbc:postgresql://127.0.0.1:5433/bambardara
```

## Docker Commands

### Stop PostgreSQL
```bash
docker-compose down
```

### Stop and Remove Data
```bash
docker-compose down -v
```
⚠️ **Warning:** This removes all database data!

### Restart PostgreSQL
```bash
docker-compose restart
```

### View Logs
```bash
docker-compose logs -f
```

## Connect to PostgreSQL

### Using Docker Exec
```bash
docker exec -it bambardara-postgres psql -U bambardara -d bambardara
```

### Using psql Client (if installed)
```bash
psql -h localhost -p 5433 -U bambardara -d bambardara
```

### Using pgAdmin or DBeaver
- Host: `localhost`
- Port: `5433`
- Database: `bambardara`
- Username: `bambardara`
- Password: `bambardara_dev`

## Useful SQL Commands

### Check Users
```sql
SELECT firebase_uid, email, role FROM users;
```

### Update User Role
```sql
UPDATE users SET role = 'ADMIN' WHERE firebase_uid = '<uid>';
```

### View Contact Requests
```sql
SELECT * FROM contact_requests;
```

## Health Check

PostgreSQL includes an automatic health check that runs every 10 seconds:
```bash
docker inspect bambardara-postgres --format='{{.State.Health.Status}}'
```

Should return: `healthy`

## Troubleshooting

### Port Already in Use
If port 5433 is already in use, edit `docker-compose.yml`:
```yaml
ports:
  - "5434:5432"  # Use a different port
```

Then update `application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://127.0.0.1:5434/bambardara
```

### Container Won't Start
Check logs:
```bash
docker logs bambardara-postgres
```

### Reset Everything
```bash
docker-compose down -v
docker-compose up -d
```

## Data Persistence

Database data is stored in a Docker volume named `postgres_data`. This ensures data persists across container restarts.

To backup data:
```bash
docker exec bambardara-postgres pg_dump -U bambardara bambardara > backup.sql
```

To restore:
```bash
docker exec -i bambardara-postgres psql -U bambardara -d bambardara < backup.sql
```

## Production Considerations

⚠️ **This setup is for LOCAL DEVELOPMENT ONLY**

For production:
1. Use strong passwords (not `bambardara_dev`)
2. Use managed database services (AWS RDS, Google Cloud SQL, etc.)
3. Enable SSL/TLS connections
4. Configure proper backup strategies
5. Use environment variables for credentials
6. Implement monitoring and alerting

## Database Migrations

This project uses Flyway for database migrations. Migrations are in:
```
src/main/resources/db/migration/
```

Migrations run automatically when the Spring Boot application starts.

### Current Migrations:
- `V1__initial_schema.sql` - Initial database schema
- `V2__add_user_role.sql` - Add role-based authorization

## Environment Variables

You can override database configuration using environment variables:

```bash
export DB_HOST=localhost
export DB_PORT=5433
export DB_NAME=bambardara
export DB_USER=bambardara
export DB_PASSWORD=bambardara_dev
```

Then update `application.properties` to use them:
```properties
spring.datasource.url=jdbc:postgresql://${DB_HOST:127.0.0.1}:${DB_PORT:5433}/${DB_NAME:bambardara}
spring.datasource.username=${DB_USER:bambardara}
spring.datasource.password=${DB_PASSWORD:bambardara_dev}
```
