# Usa una imagen base de Node.js
FROM node:22

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el package.json y el pnpm-lock.yaml
COPY package.json ./

# Instala pnpm y establece la versión deseada
RUN npm install -g pnpm@9.15.4

# Configura el directorio global de binarios y lo agrega al PATH
ENV PNPM_HOME /usr/local/lib/pnpm
ENV PATH $PNPM_HOME:$PATH

# Crea el directorio global de binarios si no existe
RUN mkdir -p $PNPM_HOME

# Usa pnpm para instalar las dependencias
RUN pnpm install --no-frozen-lockfile

# Copia el resto del código del proyecto
COPY . .

# Construye el proyecto con pnpm
RUN pnpm run build

# Instala el paquete global `serve`
RUN pnpm add -g serve

# Expone el puerto 3000
EXPOSE 3000

# Comando por defecto para correr la aplicación
CMD ["serve", "-s", "dist", "-l", "3000"]
