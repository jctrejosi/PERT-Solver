# Usa una imagen base de Node.js
FROM node:21

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de configuración primero para aprovechar la caché
COPY package.json package-lock.json tsconfig.json ./

# Instala dependencias
RUN npm install

# Luego copia el resto de los archivos del frontend
COPY . .

# Construir la aplicación
RUN npm run build

# Instalar el servidor estático para servir React
RUN npm install -g serve

# Exponer el puerto en el que correrá la app
EXPOSE 3000

# Comando para servir la aplicación
CMD ["serve", "-s", "dist", "-l", "3000"]
