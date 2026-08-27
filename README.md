# JARP3X Networks — Sistema de Ventas

Sistema web de gestión para una empresa de equipos y servicios de tecnología: administración de usuarios con roles, productos, servicios, clientes y ventas, con panel diferenciado para administrador y cliente.

🔗 **Demo en vivo:** https://jarp3x-networks.onrender.com
> Nota: el backend está en un plan gratuito de Render, así que la primera carga puede tardar ~30-60 segundos mientras el servidor "despierta".

## Tecnologías

**Backend**
- Python
- Flask
- Flask-CORS

**Base de datos**
- PostgreSQL (alojada en Supabase)

**Frontend**
- HTML
- CSS
- JavaScript (vanilla)

**Infraestructura**
- Render (hosting de backend y frontend)
- Git / GitHub (control de versiones)

## Funcionalidades

**Usuarios**
- Registro y login con contraseña encriptada (SHA-256)
- Roles diferenciados: administrador y cliente
- Panel exclusivo según el rol

**Productos y Servicios**
- Registrar, modificar, eliminar y buscar
- Control de stock y precio

**Clientes**
- Registrar, editar, eliminar y listar clientes

**Ventas** *(en desarrollo)*
- Módulo de consulta de ventas con filtros por fecha y monto

## Cuentas de prueba

| Rol | Email | Contraseña |
|---|---|---|
| Administrador | jarp3x@admin.com | admin123 |
| Cliente | Puedes registrar una cuenta nueva libremente desde la página de registro |

## Instalación local

1. Clona el repositorio:
   ```bash
   git clone https://github.com/JARP3X/JARP3X-Networks.git
   cd JARP3X-Networks
   ```

2. Instala las dependencias del backend:
   ```bash
   pip install -r requirements.txt
   ```

3. Crea una base de datos PostgreSQL (por ejemplo, en [Supabase](https://supabase.com)) y define la variable de entorno:
   ```bash
   DATABASE_URL=postgresql://usuario:contraseña@host:5432/postgres
   ```

4. Ejecuta el backend:
   ```bash
   python app.py
   ```

5. Abre `index.html` en tu navegador (o sírvelo con cualquier servidor estático).

## Próximas mejoras

- Conectar el módulo de Ventas a la base de datos (actualmente muestra datos de ejemplo)
- Relacionar ventas con productos/servicios y descuento automático de stock
- Reportes de ventas por fecha y productos más vendidos
