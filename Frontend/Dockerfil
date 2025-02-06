# Usa una imagen de Node.js
FROM node:22

# Configurar el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json e instalar dependencias
COPY package.json ./
RUN npm install
RUN npm run build
RUN npm install -g serve
EXPOSE 3000

# Comando de inicio
CMD ["serve", "-s", "build", "-l", "3000"]