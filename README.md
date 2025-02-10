# Odonto Smart Backend

Este es el backend de Odonto Smart, un sistema para la gestión de clínicas dentales desarrollado con NestJS y TypeScript.

## Variables de entorno

El sistema utiliza un archivo .env para configurar los parámetros clave del entorno. A continuación se describen las variables necesarias:

### Servidor

- `PORT=3000` - Puerto en el que se ejecuta la aplicación.

### Base de datos

- `DB_NAME=odonto` - Nombre de la base de datos.
- `CONTAINER_NAME=odonto-smart` - Nombre del contenedor de la base de datos.
- `DB_HOST=localhost` - Host de la base de datos.
- `DB_USERNAME=root` - Usuario de la base de datos.
- `DB_PASSWORD=root` - Contraseña de la base de datos.
- `DB_PORT=5432` - Puerto en el que corre la base de datos.
- `DB_TYPE=postgres` - Tipo de base de datos utilizada (PostgreSQL).
- `LOGGING=true` - Indica si se deben registrar logs de la base de datos.

### Configuración de seeders

- `SEED_EMAIL=admin.admin@gmail.com` - Correo electrónico del usuario administrador inicial.
- `SEED_PASSWORD=Admin` - Contraseña del usuario administrador inicial.

### Configuración de JWT

- `JWT_SECRET=secret-key` - Clave secreta para la firma de los tokens JWT.
- `JWT_EXPIRESIN=2h` - Tiempo de expiración del access token.
- `JWT_EXPIRENSIN_REFRESH=7d` - Tiempo de expiración del refresh token.

## Scripts de package.json

A continuación se describen los scripts disponibles en package.json para facilitar el desarrollo y la administración del proyecto:

- `build:` Compila el código TypeScript en JavaScript.
- `start:` Inicia la aplicación en modo producción.
- `start:dev:` Inicia la aplicación en modo desarrollo con recarga automática.
- `start:debug:` Inicia la aplicación en modo depuración.
- `test:` Ejecuta los tests unitarios con Jest.
- `test:watch:` Ejecuta los tests en modo observación para desarrollo.
- `test:cov:` Genera el reporte de cobertura de tests.
- `test:debug:` Inicia los tests en modo depuración.
- `test:e2e:` Ejecuta los tests end-to-end.
- `format:` Aplica Prettier para formatear el código.
- `lint:` Ejecuta ESLint para revisar errores en el código y los corrige.
- `prepare:` Configura Husky para la gestión de hooks en Git.
- `typeorm:` Ejecuta comandos de TypeORM con ts-node.
- `migration:run:` Ejecuta las migraciones de TypeORM.
- `migration:generate:` Genera una nueva migración basada en los cambios detectados en las entidades.
- `migration:create:` Crea una nueva migración vacía.
- `migration:revert:` Revierte la última migración ejecutada.
- `seeds:` Ejecuta los seeders de la base de datos.

## Posibles Mejoras

### ❌ Errores en convenciones de nombres de columnas:
Algunas columnas usan `create_at` y `update_at`, pero otras usan `created_at` y `updated_at`. Para uniformidad, todas deberían seguir la misma convención, preferiblemente `created_at` y `updated_at`.

### ❌ Eliminación en cascada inconsistente:
- `user_session.userId` tiene `ON DELETE CASCADE`, lo cual está bien para limpiar sesiones cuando un usuario se borra.
- Sin embargo, otras relaciones como `user.person_id`, `person.person_type_id` o `patient.person_id` no tienen `ON DELETE CASCADE`.
- Evalúa si algunas deberían eliminarse en cascada para evitar registros huérfanos.

### ❌ Restricción `UNIQUE` en `person_type_id`
- En la tabla `person`, la columna `person_type_id` tiene la restricción `UNIQUE`, lo que significa que solo puede haber una persona por tipo. Esto probablemente no es lo que quieres.

- Si un `person_type` puede aplicar a varias personas (por ejemplo, múltiples doctores), deberías eliminar esta restricción.

### ❌ Campo `medialHistory` mal escrito
En `patient`, la columna `medialHistory` probablemente debería ser `medicalHistory`.

### ❌ Optimización de la tabla `person_contact`
- Actualmente tiene una restricción `UNIQUE ("person_id")`, lo que implica que cada persona solo puede tener un contacto.

- Si quieres que una persona pueda tener múltiples teléfonos o correos, esta restricción debería eliminarse.
