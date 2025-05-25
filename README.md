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

## 📚 Documentación API

La documentación completa de la API está disponible en Swagger UI:

**🔗 [http://localhost:3000/api/docs](http://localhost:3000/api/docs)**

La documentación incluye:

- Descripción completa de todos los endpoints
- Ejemplos de request/response
- Validaciones de campos
- Códigos de estado HTTP
- Interfaz interactiva para probar los endpoints

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

### Provinces

#### Obtener todos las provincias

```bash
curl -X GET http://localhost:3000/provinces
```

#### Obtener provincia por ID

```bash
curl -X GET http://localhost:3000/provinces/{id}
```

#### Crear provincia

```bash
curl -X POST http://localhost:3000/provinces \
  -H "Content-Type: application/json" \
  -d '{"name": "Buenos Aires", "countryId": "id-de-pais"}'
```

#### Actualizar provincia

```bash
curl -X PUT http://localhost:3000/provinces/{id} \
  -H "Content-Type: application/json" \
  -d '{"name": "Buenos Aires", "countryId": "id-de-pais"}'
```

#### Eliminar provincia

```bash
curl -X DELETE http://localhost:3000/provinces/{id}
```

## 🏗️ Estructura del Proyecto

Este proyecto sigue los principios de **Clean Architecture**, organizando el código en capas bien definidas:

```bash
src/
├── core/                          # 🧠 Lógica de negocio (independiente de frameworks)
│   ├── application/
│   │   └── dtos/                  # Data Transfer Objects
│   ├── domain/
│   │   ├── entities/              # Entidades de dominio
│   │   ├── repository/            # Interfaces de repositorios
│   │   └── use-cases/             # Casos de uso (lógica de aplicación)
│   
├── infrastructure/                # 🔧 Implementaciones técnicas
│   ├── database/
│   │   └── repositories/          # Implementaciones de repositorios
│   └── prisma/                    # Configuración de Prisma
│   
├── presentation/                  # 🎨 Capa de presentación (REST API)
│   ├── controllers/               # Controladores REST
│   └── modules/                   # Módulos de NestJS
│   
└── main.ts                        # Punto de entrada de la aplicación
```

### 📋 Descripción de Capas

#### 🧠 Core (Dominio + Aplicación)

- **Entities**: Modelos de dominio con reglas de negocio
- **Use Cases**: Casos de uso específicos de la aplicación
- **Repository Interfaces**: Contratos para acceso a datos
- **DTOs**: Objetos para transferencia de datos

#### 🔧 Infrastructure

- **Repository Implementations**: Implementaciones concretas usando Prisma
- **Database**: Configuración y conexión a la base de datos
- **External Services**: Integraciones con servicios externos

#### 🎨 Presentation

- **Controllers**: Endpoints REST con validaciones
- **Modules**: Configuración de dependencias de NestJS
- **Middlewares**: Middleware personalizado (autenticación, logging, etc.)

### 🔄 Flujo de Datos

1. **Request** → Controller (Presentation)
2. **Controller** → Use Case (Core/Application)
3. **Use Case** → Repository Interface (Core/Domain)
4. **Repository Interface** → Repository Implementation (Infrastructure)
5. **Database** ← → Repository Implementation
6. **Response** ← Controller

### 📦 Agregar Nueva Funcionalidad

Para agregar una nueva entidad (ej: `User`):

1. **Entidad de dominio**: `src/core/domain/entities/user.entity.ts`
2. **Interface de repositorio**: `src/core/domain/repository/user.repository.ts`
3. **DTOs**: `src/core/application/dtos/user.dto.ts`
4. **Casos de uso**: `src/core/domain/use-cases/user/`
5. **Implementación de repositorio**: `src/infrastructure/database/repositories/user.repository.impl.ts`
6. **Controlador**: `src/presentation/controllers/user.controller.ts`
7. **Módulo**: `src/presentation/modules/user.module.ts`

## 🗄️ Base de Datos

La base de datos PostgreSQL se ejecuta en el puerto `5432` con las siguientes credenciales:

- **Usuario**: postgres
- **Contraseña**: postgres
- **Base de datos**: clean_arch

Para acceder directamente:

```bash
docker exec -it nest-clean-postgres psql -U postgres -d clean_arch
```
