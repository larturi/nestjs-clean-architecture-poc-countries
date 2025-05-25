# NestJS Clean Architecture POC

API REST con arquitectura limpia usando NestJS, Prisma y PostgreSQL.

## 🚀 Setup

### 1. Levantar la base de datos

```bash
docker-compose up -d
```

### 2. Instalar dependencias

```bash
pnpm install
```

### 3. Configurar Prisma

```bash
# Crear archivo .env
echo "DATABASE_URL=\"postgresql://postgres:postgres@localhost:5432/clean_arch\"" > .env

# Aplicar migraciones
npx prisma migrate dev

# Generar cliente
npx prisma generate
```

### 4. Ejecutar la aplicación

```bash
pnpm run start:dev
```

La API estará disponible en `http://localhost:3000`

## 📋 Endpoints

### Countries

#### Obtener todos los países

```bash
curl -X GET http://localhost:3000/countries
```

#### Obtener país por ID

```bash
curl -X GET http://localhost:3000/countries/{id}
```

#### Crear país

```bash
curl -X POST http://localhost:3000/countries \
  -H "Content-Type: application/json" \
  -d '{"name": "Argentina"}'
```

#### Actualizar país

```bash
curl -X PUT http://localhost:3000/countries/{id} \
  -H "Content-Type: application/json" \
  -d '{"name": "Argentina Updated"}'
```

#### Eliminar país

```bash
curl -X DELETE http://localhost:3000/countries/{id}
```

## 🗄️ Base de Datos

La base de datos PostgreSQL se ejecuta en el puerto `5432` con las siguientes credenciales:

- **Usuario**: postgres
- **Contraseña**: postgres
- **Base de datos**: clean_arch

Para acceder directamente:

```bash
docker exec -it nest-clean-postgres psql -U postgres -d clean_arch
```
