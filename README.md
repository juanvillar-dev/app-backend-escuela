# 📚 Backend Escuela

Proyecto backend para gestión escolar, desarrollado con **Node.js**, **TypeScript**, **Express**, **Prisma ORM** y siguiendo principios de **Clean Architecture + DDD**.

---

## 🚀 Tecnologías utilizadas
- Node.js
- TypeScript
- Express
- Prisma ORM
- PostgreSQL (o la base de datos que configures)
- Clean Architecture + Domain Driven Design (DDD)

---

## 📂 Estructura del proyecto
```
src/
 ├── domain/              # Entidades y contratos de repositorios
 ├── application/         # Casos de uso y DTOs
 ├── infrastructure/      # Implementaciones técnicas (Prisma, Express)
 ├── presentation/        # Controladores y rutas HTTP
 ├── config/              # Configuración (env, logger, etc.)
 └── app.ts               # Punto de entrada de la aplicación
```

---

## ⚙️ Instalación

Clona el repositorio y entra en la carpeta:

```bash
git clone https://github.com/tuusuario/app-backend-escuela.git
cd app-backend-escuela
```

Instala dependencias:

```bash
npm install
```


---

## 🔑 Configuración de entorno

Crea un archivo `.env` en la raíz del proyecto basado en el ejemplo:

```bash
cp example.env .env
```

---

## Levantar la base de datos con Docker

```bash
docker-compose up -d
```
Edita las variables según tu entorno (ejemplo: conexión a la base de datos).

---

## 🗄️ Prisma ORM

Genera el cliente de Prisma:

```bash
npx prisma generate
```

Ejecuta el data.sql para llenar la bd
```bash
npx prisma db execute --file ./data.sql
```

---

## ▶️ Ejecución

Modo desarrollo (con tsx):

```bash
npm run dev
```

Compilar y ejecutar en producción:

```bash
npm run build
npm start
```

---

## 🧪 Scripts disponibles

- `npm run dev` → Ejecuta en modo desarrollo con hot reload.  
- `npm run build` → Compila TypeScript a JavaScript en `dist/`.  
- `npm start` → Corre la versión compilada.  
- `npx prisma studio` → Abre Prisma Studio para explorar la base de datos.  

---

## 📖 Notas
- **No subas tu `.env` real**. Usa `.env.example` para compartir las variables necesarias.  
- **node_modules**, **dist**, **build**, y archivos generados por Prisma están en `.gitignore`.  
- La arquitectura está pensada para escalar y mantener separación clara entre capas.  

---

## ✨ Próximos pasos
- Definir casos de uso iniciales (ej. crear alumno, asignar sección).  
- Implementar controladores y rutas REST.  
- Documentar API con Swagger o similar.  

---

## 👨‍💻 Autoría
Creado por **Juan Villar** como parte de mi formación en desarrollo backend con Node.js y TypeScript.  
El contenido fue desarrollado con fines educativos y de práctica, siguiendo principios de Clean Architecture y DDD.

---

## 📄 Licencia
Este proyecto está bajo la licencia [Apache 2.0](LICENSE).  
Redistribuciones deben incluir el archivo [NOTICE](NOTICE) con la atribución correspondiente.


