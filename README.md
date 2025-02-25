# PERT-Solver

## Descripción del Proyecto

PERT-Solver es una aplicación diseñada para facilitar la gestión y el análisis de proyectos utilizando el método PERT (Program Evaluation and Review Technique). La herramienta permite calcular tiempos estimados de finalización de tareas, identificar rutas críticas y optimizar la planificación de proyectos.

## Estructura del Proyecto

El proyecto está dividido en dos partes principales: el backend y el frontend. Cada parte se encuentra organizada en su propia carpeta para facilitar su desarrollo y mantenimiento.

### Backend

Ubicado en `Backend/`, se basa en Flask y maneja la lógica del sistema.

#### Estructura del Backend

```bash
PERT-Solver/
│
├── Backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── routes.py
│   │   ├── models.py
│   │   └── utils.py
│   ├── venv/
│   ├── main.py
│   ├── requirements.txt
│   └── README.md
```

### Frontend

Ubicado en `Frontend/`, se basa en React y proporciona la interfaz de usuario.

#### Estructura del Frontend

```bash
PERT-Solver/
│
├── Frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   └── App.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── README.md
```

## Tecnologías Utilizadas

### En el Backend

- **Flask**: Framework web ligero para Python.
- **Pandas**: Biblioteca para análisis y manipulación de datos.
- **Gunicorn**: Servidor WSGI para despliegue en producción.
- **Docker** (Opcional): Para contenerización de la aplicación.

### En el Frontend

- **React**: Biblioteca para la construcción de interfaces de usuario.
- **Axios** Para realizar solicitudes HTTP.

## Instalación y Configuración

### Configuración del Backend con `pipenv`

1. Instalar `pipenv`:

   ```sh
   pip install pipenv
   ```

2. Crear un Entorno Virtual y Pipfile:

   ```sh
   cd Backend
   pipenv install
   ```

   Esto creará un entorno virtual y generará un archivo `Pipfile` en la raíz de la carpeta `Backend`.

3. Activar el Entorno Virtual:

   ```sh
   pipenv shell
   ```

4. Ejecutar el Proyecto:

   ```sh
   python main.py
   ```

### Configuración del Frontend

1. Instalar dependencias:

   ```sh
   cd Frontend
   npm install
   ```

2. Ejecutar el frontend:

   ```sh
   npm run dev
   ```

## Despliegue en Producción

Para desplegar la aplicación en producción, se recomienda el uso de **Gunicorn** o **Docker**.

### Gunicorn

```sh
gunicorn -w 4 -b 0.0.0.0:8000 app:app
```

### Docker

1. Crear un `Dockerfile` con:

   ```dockerfile
   FROM python:3.9-slim
   WORKDIR /app
   COPY . .
   RUN pip install --no-cache-dir -r requirements.txt
   EXPOSE 8000
   CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:8000", "app:app"]
   ```

2. Construir y ejecutar el contenedor:

   ```sh
   docker build -t flask-app .
   docker run -p 8000:8000 flask-app
   ```

## Contribución

Si deseas contribuir al desarrollo de PERT-Solver, revisa el archivo `CONTRIBUTING.md`.

## Licencia

Este proyecto está licenciado bajo [MIT License](LICENSE).
