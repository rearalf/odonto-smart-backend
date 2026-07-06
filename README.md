# Odonto Smart - Backend

## 📝 Descripción General

**Odonto Smart Backend** es la API RESTful de la aplicación de gestión de clínicas dentales "Odonto Smart". El sistema permite administrar de manera integrada usuarios de distintos roles (incluyendo doctores con sus respectivas especialidades), pacientes, citas médicas (appointments) y un odontograma digital interactivo. Está diseñado siguiendo las mejores prácticas de arquitectura modular, seguridad y escalabilidad utilizando el framework NestJS.

## 🛠️ Stack Tecnológico

El backend está construido con las siguientes tecnologías de primer nivel:

- **Framework principal:** [NestJS](https://nestjs.com/) (v11+) - Un framework de Node.js progresivo para construir aplicaciones del lado del servidor eficientes y confiables.
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/) - Superconjunto de JavaScript con tipado estático.
- **Base de Datos y ORM:**
  - [PostgreSQL](https://www.postgresql.org/) - Sistema de gestión de bases de datos relacionales potente y de código abierto.
  - [TypeORM](https://typeorm.io/) - ORM para TypeScript y JavaScript que facilita la interacción con la base de datos a través de entidades y migraciones.
- **Validación y Configuración:**
  - [Joi](https://joi.dev/) y `class-validator` / `class-transformer` - Para validación estricta de esquemas de variables de entorno y payloads de entrada (DTOs).
- **Herramientas de Calidad y Git Hooks:**
  - Prettier, ESLint, Husky y Commitlint - Para asegurar consistencia en el código y mensajes de commit estandarizados.

## 📂 Estructura de Carpetas

El proyecto sigue una estructura modular recomendada por NestJS, organizada de la siguiente manera:

```text
odonto-smart-back/
├── src/
│   ├── appointment/         # Módulo de gestión de citas médicas
│   ├── common/              # Recursos compartidos (DTOs genéricos, enums, helpers, utilidades)
│   ├── config/              # Configuraciones de la app (variables de entorno, TypeORM, validaciones)
│   ├── db/                  # Módulo de base de datos (entidades globales, migraciones y seeders)
│   ├── doctor/              # Módulo de doctores, especialidades y horarios
│   ├── health/              # Endpoint de verificación de salud (health check) con NestJS Terminus
│   ├── odontogram/          # Módulo para el registro y manejo del odontograma de pacientes
│   ├── patient/             # Módulo de gestión de pacientes
│   ├── person/              # Módulo base de datos personales/comunes
│   ├── user/                # Módulo de usuarios, roles, autenticación y sesión
│   ├── app.module.ts        # Módulo raíz de la aplicación
│   └── main.ts              # Punto de entrada de la aplicación (bootstrap)
├── test/                    # Pruebas de integración de extremo a extremo (E2E)
├── .env.template            # Plantilla con las variables de entorno necesarias
└── package.json             # Dependencias y scripts del proyecto
```

## ⚙️ Tecnologías Necesarias para Levantar el Proyecto

Para poder ejecutar el proyecto localmente, asegúrate de tener instalado en tu sistema:

1. **Node.js** (Versión LTS recomendada, v18.x o superior)
2. **NPM** (Incluido con Node.js) o Yarn/PNPM.
3. **PostgreSQL** (Versión 14 o superior) corriendo localmente o mediante un contenedor Docker.

## 🚀 Requisitos para Levantar el Proyecto

Sigue estos pasos detallados para configurar y ejecutar el servidor de desarrollo local:

### 1. Clonar el repositorio e instalar dependencias

Clona el repositorio en tu máquina local, navega al directorio del proyecto y ejecuta:

```bash
npm install
```

### 2. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto basándote en la plantilla `.env.template`:

```bash
cp .env.template .env
```

_Nota: En Windows puedes duplicar el archivo y renombrarlo como `.env`._

Abre el archivo `.env` y configura las variables de conexión a tu base de datos PostgreSQL, puerto y credenciales para el seeder inicial:

```env
PORT=3000
ALLOWED_ORIGINS=http://localhost:5173
API_VERSION=v1
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_USER=tu_usuario_postgres
DB_PASSWORD=tu_contraseña_postgres
DB_NAME=nombre_de_tu_bd
DB_TYPE=postgres

USER_EMAIL=tu_correo_para_seeder@gmail.com
USER_PASSWORD=tu_contraseña_seeder
```

### 3. Crear la base de datos

Asegúrate de que la base de datos con el nombre especificado en `DB_NAME` exista en tu servidor PostgreSQL.

### 4. Ejecutar migraciones y poblar la base de datos (Seeds)

Ejecuta el siguiente comando para limpiar/construir el esquema de la base de datos, correr las migraciones e insertar los datos iniciales necesarios (usuarios de prueba, etc.):

```bash
npm run db:reset
```

_Si solo quieres correr las migraciones:_

```bash
npm run migration:run
```

_Si solo quieres ejecutar los seeders:_

```bash
npm run seed
```

### 5. Iniciar la aplicación

#### Modo de Desarrollo (con recarga automática)

```bash
npm run start:dev
```

#### Modo Producción (Compilar y ejecutar)

```bash
npm run build
npm run start:prod
```

La API estará disponible en el puerto que hayas configurado en el archivo `.env` (por defecto `http://localhost:3000/api/v1`).

---

## 🧪 Pruebas (Tests)

Puedes ejecutar el conjunto de pruebas unitarias y de integración del proyecto utilizando:

```bash
# Pruebas unitarias
npm run test

# Pruebas E2E (de extremo a extremo)
npm run test:e2e

# Cobertura de pruebas (Coverage)
npm run test:cov
```
