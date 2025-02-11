# Usa una imagen base de Node.js
FROM node:22

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el package.json
COPY package.json package-lock.json ./

# Usa npm para instalar las dependencias
RUN npm install

# Copia el resto del código del proyecto
COPY . .

# Construye el proyecto con pnpm
RUN npm run build

# Instala el paquete global `serve`
RUN npm install -g serve

# Expone el puerto 3000
EXPOSE 3000

# Comando por defecto para correr la aplicación
CMD ["serve", "-s", "dist", "-l", "3000"]
