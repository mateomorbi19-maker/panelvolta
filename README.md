# Panel VoltUY — demo

Demo navegable del panel de control para Voltbike, usado como soporte visual en la llamada de ventas. HTML/CSS/JS planos, sin frameworks, sin build step. Todos los datos son mocks: nada se guarda en un backend.

## Flujo

1. `/` → pantalla de login con el usuario **Pablo**.
2. Click en Pablo → entra al panel.
3. Cinco secciones navegables:
   - **Inicio** — KPIs, actividad reciente, top consultas.
   - **Conversaciones** — vista tipo WhatsApp con el agente IA respondiendo en vivo. Botón "Pausar agente" / "Tomar control".
   - **Base de leads** — tabla con clientes y prospectos, buscador, botón de reactivación.
   - **Nueva venta** — formulario para cargar una venta presencial: nombre, teléfono, productos (catálogo real de voltbike.uy), total auto-calculado.
   - **Agente IA** — toggle activo/pausado, estadísticas, audios pregrabados.
4. Logout vuelve al login.

## Estructura

```
.
├── index.html        # login (entry)
├── panel.html        # panel con las 5 secciones
├── styles.css        # estilos
├── app.js            # estado + interacciones
├── Dockerfile        # nginx:alpine en :80
├── .dockerignore
├── .gitignore
└── README.md
```

## Correr local

Doble click en `index.html`, o levantar un server estático:

```bash
python -m http.server 8080
# o
npx serve .
```

Y abrir `http://localhost:8080`.

## Buildear y correr con Docker

```bash
docker build -t panel-voltuy .
docker run --rm -p 8080:80 panel-voltuy
```

## Deploy en Easypanel

1. **+ Service → App**.
2. Source: GitHub → repo `mateomorbi19-maker/panelvolta`, branch `main`.
3. Build method: **Dockerfile** (raíz del repo).
4. Puerto interno: **80**.
5. Asignar dominio y deploy.

Sin variables de entorno. Sin dependencias externas.
