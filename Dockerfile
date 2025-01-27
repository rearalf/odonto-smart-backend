# Usa la imagen oficial de Node.js
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos necesarios para instalar dependencias
COPY package.json package-lock.json ./
RUN npm install

# Copia todo el código fuente
COPY . .

# Construye la aplicación
RUN npm run build

# Expone el puerto que usará el servidor
EXPOSE 3000

# Comando por defecto para ejecutar migraciones, seeds y backend
CMD ["sh", "-c", "npm run migration:run && npm run seeds && npm run start:prod"]
