# ============================================
# JARP3X Networks - Backend con Flask + MySQL
# ============================================

from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import hashlib
import os

app = Flask(__name__)
CORS(app)

# ============================================
# CONEXION A LA BASE DE DATOS
# ============================================
def conectar():
    return mysql.connector.connect(
        host=os.environ.get("MYSQLHOST"),
        port=int(os.environ.get("MYSQLPORT")),
        user=os.environ.get("MYSQLUSER"),
        password=os.environ.get("MYSQLPASSWORD"),
        database=os.environ.get("MYSQLDATABASE")
    )

# ============================================
# RUTA: REGISTRAR USUARIO
# ============================================
@app.route("/registrar", methods=["POST"])
def registrar():
    datos = request.json
    nombre = datos.get("nombre")
    email = datos.get("email")
    password = datos.get("password")

    # Encriptar contraseña con SHA256
    password_hash = hashlib.sha256(password.encode()).hexdigest()

    try:
        db = conectar()
        cursor = db.cursor()
        cursor.execute(
            "INSERT INTO usuarios (nombre, email, password) VALUES (%s, %s, %s)",
            (nombre, email, password_hash)
        )
        db.commit()
        return jsonify({"mensaje": "Usuario registrado correctamente"}), 201
    except mysql.connector.errors.IntegrityError:
        return jsonify({"error": "El email ya está registrado"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
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

    try:
        db = conectar()
        cursor = db.cursor(dictionary=True)
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
        cursor.close()
        db.close()

# ============================================
# RUTA: LISTAR USUARIOS (solo admin)
# ============================================
@app.route("/usuarios", methods=["GET"])
def listar_usuarios():
    try:
        db = conectar()
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT id, nombre, email, rol, fecha_registro FROM usuarios")
        usuarios = cursor.fetchall()
        return jsonify(usuarios), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        db.close()

# ============================================
# INICIAR SERVIDOR
# ============================================
if __name__ == "__main__":
    app.run(debug=True, port=5000)