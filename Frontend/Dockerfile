# Usa una imagen base de Node.js
FROM node:22

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el resto del código del proyecto
COPY . .

# Instala pnpm y establece la versión deseada
RUN npm install -g pnpm@9.15.4

# Usa pnpm para instalar las dependencias
RUN pnpm install

# Construye el proyecto con pnpm
RUN pnpm run build

# Instala el paquete global `serve` para servir la aplicación
RUN pnpm add -g serve

# Expone el puerto 3000
EXPOSE 3000

# Comando por defecto para correr la aplicación
CMD ["serve", "-s", "dist", "-l", "3000"]
