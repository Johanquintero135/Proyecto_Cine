#  Cinema API - ¡El Router Ninja! 🥋

##  Resumen del Proyecto

Esta es una **API REST** para la gestión completa de un sistema de cine, construida con **Node.js** y **Express.js**. El foco principal de esta práctica ha sido implementar un **routing avanzado, modular y profesional**, garantizando una arquitectura limpia y escalable.

---

##  Información del Estudiante

| Detalle | Valor |
| :--- | :--- |
| **Estudiante** | **JOHAN ALEJANDRO QUINTERO BARROS** |
| **Ficha** | 3147235 |
| **Bootcamp** | bc-express - SENA CGMLTI |
| **Fecha de Entrega** | 14 de Octubre de 2025 |

---

##  Características Principales (Lo que logré)

El proyecto está diseñado bajo buenas prácticas de desarrollo web:

-  **Routing Modular:** Uso de `express.Router()` para separar las rutas de cada entidad.
-  **Arquitectura Limpia:** Separación estricta de **rutas** y **controladores** (lógica de negocio).
-  **Manejo de Peticiones Complejas:**
    - Implementación de **Route Parameters** (`/movies/:id`).
    - **Query Strings** para filtros (`?genre=Action`) y paginación (`?page=1&limit=10`).
-  **Validación Robusta:** Validación de datos de entrada y chequeo de **integridad referencial** (ej: asegurar que el `movieId` exista antes de crear una función).
-  **Códigos HTTP Apropiados:** Respuestas claras con 200, 201, 400, 404, etc.
-  **Datos en Memoria:** Uso de datos de prueba persistentes mientras el servidor esté activo.

---

##  Entidades del Cine

El sistema gestiona tres entidades principales con sus respectivas relaciones:

| Entidad | Descripción | Campos Clave |
| :--- | :--- | :--- |
| **1. Movies (Películas)** | Títulos, géneros y calificación. | `id`, `title`, `genre`, `rating` |
| **2. Screenings (Funciones)** | Proyecciones de películas. | `id`, `movieId` (referencia), `room`, `schedule`, `availableSeats` |
| **3. Tickets (Boletos)** | Boletos vendidos. | `id`, `screeningId` (referencia), `seatNumber`, `price` |

---

##  Instalación y Ejecución

Para poner en marcha esta API, sigue estos sencillos pasos instructor:

### Prerequisitos
- [Node.js](https://nodejs.org/) (versión 18+ recomendada)
- npm o pnpm

### Pasos

1.  **Crea la estructura base e inicializa el proyecto:**
    ```bash
    mkdir -p mi-primera-api-express/src/{routes,controllers,data}
    cd mi-primera-api-express
    npm init -y
    ```

2.  **Instala Express.js:**
    ```bash
    npm install express
    ```

3.  **Copia los archivos** proporcionados (`server.js`, las rutas, los controladores, etc.) en sus directorios correspondientes.

4.  **Ejecuta el servidor:**

    ```bash
    # En modo de desarrollo (con auto-reload en Node 18+)
    npm run dev
    
    # O en modo normal
    npm start
    ```

5.  **Verifica que está activo:** Abre `http://localhost:3000` en tu navegador.

---

## Endpoints de la API (La Guía)

Todos los endpoints usan el prefijo `/api/`.

### 1. Películas (`/api/movies`)

| Método | Endpoint | Descripción | Ejemplos de Filtros |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/movies` | Listar todas | `?genre=Action&minRating=8&page=1` |
| `GET` | `/api/movies/:id` | Obtener por ID | - |
| `POST` | `/api/movies` | Crear nueva película | - |
| `PUT` | `/api/movies/:id` | Actualizar por ID | - |
| `DELETE` | `/api/movies/:id` | Eliminar por ID | - |

### 2. Funciones (`/api/screenings`)

| Método | Endpoint | Descripción | Ejemplos de Filtros |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/screenings` | Listar todas | `?movieId=1&room=IMAX&page=1` |
| `GET` | `/api/screenings/:id` | Obtener por ID | - |
| `POST` | `/api/screenings` | Crear nueva función | - |

### 3. Boletos (`/api/tickets`)

| Método | Endpoint | Descripción | Ejemplos de Filtros |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/tickets` | Listar todos | `?screeningId=1&minPrice=10&page=1` |
| `POST` | `/api/tickets` | Crear nuevo boleto | - |
| `DELETE` | `/api/tickets/:id` | Eliminar por ID | - |

---

##  Ejemplos de Uso con `curl`

La mejor manera de probar la API es usando herramientas como **Postman**, **Thunder Client** o **curl**.

### Crear una nueva película
```bash
curl -X POST http://localhost:3000/api/movies \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Matrix",
    "genre": "Sci-Fi",
    "duration": 136,
    "rating": 8.7
  }'