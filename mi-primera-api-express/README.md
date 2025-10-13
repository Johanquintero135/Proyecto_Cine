# 🎬 Cinema API - Routing Avanzado

**Práctica 4**: Routing Avanzado y Organización  
**Estudiante**: JOHAN ALEJANDRO QUINTERO BARROS  
**Ficha**: 3147235  
**Fecha**: 09 de Octubre de 2025

## 📋 Descripción

API REST para gestión de cine que implementa patrones de routing profesional con Express.js, incluyendo:
- ✅ Routing modular con `express.Router()`
- ✅ Route Parameters (`:id`)
- ✅ Query Strings (filtros y paginación)
- ✅ Validación de datos
- ✅ Códigos HTTP apropiados
- ✅ Arquitectura limpia (controladores separados)

## 🗂️ Entidades

### 1. Movies (Películas)
- `id` - Number (auto-generado)
- `title` - String
- `genre` - String
- `duration` - Number (minutos)
- `rating` - Number (0-10)

### 2. Screenings (Funciones)
- `id` - Number (auto-generado)
- `movieId` - Number (referencia a Movie)
- `room` - String
- `schedule` - String (ISO 8601)
- `availableSeats` - Number

### 3. Tickets (Boletos)
- `id` - Number (auto-generado)
- `screeningId` - Number (referencia a Screening)
- `seatNumber` - Number
- `price` - Number
- `purchaseDate` - String (YYYY-MM-DD)

## 📁 Estructura del Proyecto

```
mi-primera-api-express/
├── package.json
├── server.js
└── src/
    ├── routes/
    │   ├── movies.routes.js
    │   ├── screenings.routes.js
    │   └── tickets.routes.js
    ├── controllers/
    │   ├── movies.controller.js
    │   ├── screenings.controller.js
    │   └── tickets.controller.js
    └── data/
        └── moviesData.js
```

## 🚀 Instalación y Ejecución

### Prerequisitos
- Node.js 18+ instalado
- npm o pnpm

### Pasos

1. **Crear la estructura de carpetas**:
```bash
mkdir -p mi-primera-api-express/src/{routes,controllers,data}
cd mi-primera-api-express
```

2. **Inicializar el proyecto**:
```bash
npm init -y
```

3. **Instalar dependencias**:
```bash
npm install express
```

4. **Copiar todos los archivos** proporcionados en sus ubicaciones correspondientes

5. **Ejecutar el servidor**:
```bash
# Modo normal
npm start

# Modo desarrollo (con auto-reload en Node 18+)
npm run dev
```

6. **Verificar que funciona**:
```bash
# En tu navegador o con curl
curl http://localhost:3000
```

## 📡 Endpoints API

### Movies (Películas)

| Método | Endpoint | Descripción | Query Params |
|--------|----------|-------------|--------------|
| GET | `/api/movies` | Listar todas las películas | `?genre=Action&minRating=8&page=1&limit=10` |
| GET | `/api/movies/:id` | Obtener película por ID | - |
| POST | `/api/movies` | Crear nueva película | - |
| PUT | `/api/movies/:id` | Actualizar película | - |
| DELETE | `/api/movies/:id` | Eliminar película | - |

### Screenings (Funciones)

| Método | Endpoint | Descripción | Query Params |
|--------|----------|-------------|--------------|
| GET | `/api/screenings` | Listar todas las funciones | `?movieId=1&room=IMAX&page=1&limit=10` |
| GET | `/api/screenings/:id` | Obtener función por ID | - |
| POST | `/api/screenings` | Crear nueva función | - |
| PUT | `/api/screenings/:id` | Actualizar función | - |
| DELETE | `/api/screenings/:id` | Eliminar función | - |

### Tickets (Boletos)

| Método | Endpoint | Descripción | Query Params |
|--------|----------|-------------|--------------|
| GET | `/api/tickets` | Listar todos los boletos | `?screeningId=1&minPrice=10&maxPrice=20&page=1&limit=10` |
| GET | `/api/tickets/:id` | Obtener boleto por ID | - |
| POST | `/api/tickets` | Crear nuevo boleto | - |
| PUT | `/api/tickets/:id` | Actualizar boleto | - |
| DELETE | `/api/tickets/:id` | Eliminar boleto | - |

## 📝 Ejemplos de Uso

### 1. Listar todas las películas
```bash
curl http://localhost:3000/api/movies
```

### 2. Filtrar películas por género
```bash
curl "http://localhost:3000/api/movies?genre=Action"
```

### 3. Obtener película por ID
```bash
curl http://localhost:3000/api/movies/1
```

### 4. Crear una nueva película
```bash
curl -X POST http://localhost:3000/api/movies \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Matrix",
    "genre": "Sci-Fi",
    "duration": 136,
    "rating": 8.7
  }'
```

### 5. Actualizar una película
```bash
curl -X PUT http://localhost:3000/api/movies/1 \
  -H "Content-Type: application/json" \
  -d '{
    "rating": 9.5
  }'
```

### 6. Eliminar una película
```bash
curl -X DELETE http://localhost:3000/api/movies/1
```

### 7. Crear una función (screening)
```bash
curl -X POST http://localhost:3000/api/screenings \
  -H "Content-Type: application/json" \
  -d '{
    "movieId": 1,
    "room": "Sala VIP",
    "schedule": "2025-10-14T20:00:00",
    "availableSeats": 50
  }'
```

### 8. Crear un boleto
```bash
curl -X POST http://localhost:3000/api/tickets \
  -H "Content-Type: application/json" \
  -d '{
    "screeningId": 1,
    "seatNumber": 25,
    "price": 15.50,
    "purchaseDate": "2025-10-13"
  }'
```

### 9. Filtrar boletos por función
```bash
curl "http://localhost:3000/api/tickets?screeningId=1"
```

### 10. Paginación
```bash
curl "http://localhost:3000/api/movies?page=1&limit=2"
```

## ✅ Requisitos Cumplidos

- [x] **Routing Modular**: Archivos de rutas separados usando `express.Router()`
- [x] **Route Parameters**: Implementado `:id` en todas las entidades
- [x] **Query Strings**: Filtrado y paginación funcionando
- [x] **Validación**: Campos requeridos validados en POST/PUT
- [x] **Códigos HTTP**: 200, 201, 400, 404, 500 implementados
- [x] **Datos de Prueba**: 5 elementos por entidad
- [x] **Arquitectura Limpia**: Separación de rutas y controladores
- [x] **Nomenclatura en Inglés**: Todo el código técnico en inglés

## 🛠️ Tecnologías Utilizadas

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **ES Modules** - Sistema de módulos moderno

## 📊 Estructura de Respuestas

### Respuesta Exitosa (200/201)
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { ... }
}
```

### Respuesta con Paginación
```json
{
  "success": true,
  "count": 5,
  "page": 1,
  "limit": 10,
  "data": [ ... ]
}
```

### Respuesta de Error (400/404/500)
```json
{
  "success": false,
  "error": "Error Type",
  "message": "Detailed error message"
}
```

## 🎯 Características Adicionales

1. **Validación de Relaciones**: 
   - Screenings valida que el movieId exista
   - Tickets valida que el screeningId exista

2. **Validación de Asientos**:
   - No permite duplicar asientos en la misma función

3. **Filtrado Avanzado**:
   - Movies: por género y rating mínimo
   - Screenings: por película y sala
   - Tickets: por función y rango de precios

4. **Paginación**:
   - Implementada en todos los endpoints GET de listado

## 🐛 Testing

Puedes probar todos los endpoints usando:
- **Postman** (recomendado)
- **Thunder Client** (extensión VS Code)
- **curl** (línea de comandos)
- **Navegador** (solo GET)

## 📦 Próximos Pasos (Mejoras Futuras)

- [ ] Agregar base de datos real (PostgreSQL/MongoDB)
- [ ] Implementar autenticación JWT
- [ ] Agregar tests automatizados
- [ ] Documentación con Swagger
- [ ] Rate limiting
- [ ] CORS configuration

## 👤 Autor

**JOHAN ALEJANDRO QUINTERO BARROS**  
Ficha: 3147235  
Bootcamp: bc-express - SENA CGMLTI

## 📄 Licencia

Este proyecto es parte de la Práctica 4 del Bootcamp bc-express y es solo para fines educativos.

---

**Nota**: Este proyecto usa datos en memoria. Al reiniciar el servidor, todos los cambios se perderán.