# ============================================
# JARP3X Networks - Backend con Flask + PostgreSQL (Supabase)
# ============================================

from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import psycopg2.extras
import hashlib
import os

app = Flask(__name__)
CORS(app)

# ============================================
# RUTA PRINCIPAL PARA RENDER
# ============================================
@app.route("/")
def home():
    return jsonify({"mensaje": "Backend JARP3X funcionando"}), 200

# ============================================
# CONEXION A LA BASE DE DATOS
# ============================================
def conectar():
    return psycopg2.connect(os.environ.get("DATABASE_URL"))

# ============================================
# RUTA: REGISTRAR USUARIO
# ============================================
@app.route("/registrar", methods=["POST"])
def registrar():
    datos = request.json
    nombre = datos.get("nombre")
    email = datos.get("email")
    password = datos.get("password")

    password_hash = hashlib.sha256(password.encode()).hexdigest()

    db = None
    cursor = None

    try:
        db = conectar()
        cursor = db.cursor()
        cursor.execute(
            "INSERT INTO usuarios (nombre, email, password) VALUES (%s, %s, %s)",
            (nombre, email, password_hash)
        )
        db.commit()
        return jsonify({"mensaje": "Usuario registrado correctamente"}), 201

    except psycopg2.errors.UniqueViolation:
        return jsonify({"error": "El email ya está registrado"}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if db:
            db.close()

# ============================================
# RUTA: LOGIN DE USUARIO
# ============================================
@app.route("/login", methods=["POST"])
def login():
    datos = request.json
    email = datos.get("email")
    password = datos.get("password")

    password_hash = hashlib.sha256(password.encode()).hexdigest()

    db = None
    cursor = None

    try:
        db = conectar()
        cursor = db.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cursor.execute(
            "SELECT * FROM usuarios WHERE email = %s AND password = %s",
            (email, password_hash)
        )
        usuario = cursor.fetchone()

        if usuario:
            return jsonify({
                "mensaje": "Login exitoso",
                "usuario": usuario["nombre"],
                "rol": usuario["rol"]
            }), 200
        else:
            return jsonify({"error": "Email o contraseña incorrectos"}), 401

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if db:
            db.close()

# ============================================
# RUTA: LISTAR USUARIOS
# ============================================
@app.route("/usuarios", methods=["GET"])
def listar_usuarios():
    db = None
    cursor = None

    try:
        db = conectar()
        cursor = db.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cursor.execute("SELECT id, nombre, email, rol, fecha_registro FROM usuarios")
        usuarios = cursor.fetchall()
        return jsonify(usuarios), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if db:
            db.close()

# ============================================
# RUTA: LISTAR CLIENTES
# ============================================
@app.route("/clientes", methods=["GET"])
def listar_clientes():
    db = None
    cursor = None

    try:
        db = conectar()
        cursor = db.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cursor.execute("SELECT id, nombre, email, telefono, fecha_registro FROM clientes ORDER BY id")
        clientes = cursor.fetchall()
        return jsonify(clientes), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if db:
            db.close()

# ============================================
# RUTA: AGREGAR CLIENTE
# ============================================
@app.route("/clientes", methods=["POST"])
def agregar_cliente():
    datos = request.json
    nombre = datos.get("nombre")
    email = datos.get("email")
    telefono = datos.get("telefono")

    db = None
    cursor = None

    try:
        db = conectar()
        cursor = db.cursor()
        cursor.execute(
            "INSERT INTO clientes (nombre, email, telefono) VALUES (%s, %s, %s)",
            (nombre, email, telefono)
        )
        db.commit()
        return jsonify({"mensaje": "Cliente agregado correctamente"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if db:
            db.close()

# ============================================
# RUTA: ELIMINAR CLIENTE
# ============================================
@app.route("/clientes/<int:id>", methods=["DELETE"])
def eliminar_cliente(id):
    db = None
    cursor = None

    try:
        db = conectar()
        cursor = db.cursor()
        cursor.execute("DELETE FROM clientes WHERE id = %s", (id,))
        db.commit()
        return jsonify({"mensaje": "Cliente eliminado correctamente"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if db:
            db.close()
            
# ============================================
# INICIAR SERVIDOR LOCAL
# ============================================
if __name__ == "__main__":
    app.run(debug=True, port=5000)