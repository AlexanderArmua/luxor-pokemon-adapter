FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copiar el archivo de variables de entorno
COPY .env .env

# Copiar el código fuente de la aplicación
COPY . .

# Dar permisos de ejecución al script wait-for-it.sh
COPY wait-for-it.sh .
RUN chmod +x wait-for-it.sh

# Generar interfaces y tipos de Prisma
RUN yarn prisma:generate

# Exponer el puerto de la aplicación
EXPOSE 3000

# Esperar a que la base de datos esté disponible antes de ejecutar la migración y luego iniciar la aplicación
CMD ["./wait-for-it.sh", "postgres:5455", "--", "yarn", "migrate:prod", "dev"]
