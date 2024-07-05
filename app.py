from flask import Flask, jsonify, request
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://127.0.0.1:5500"])


#get 
@app.route('/libros', methods=['GET'])
def ver_libros():
    db = mysql.connector.connect(
        host='marianav91.mysql.pythonanywhere-services.com',
        user='marianav91', 
        password='RojoAzul!', 
        database='marianav91$catalogo' 
    )

    cursor = db.cursor(dictionary=True) 
    cursor.execute("SELECT * FROM libros")

    libros = cursor.fetchall()

    cursor.close()
    return jsonify(libros) 


#delete 
@app.route('/eliminar_libro/<int:id>', methods=['DELETE'])
def eliminar_libro(id):
    db = mysql.connector.connect(
        host='marianav91.mysql.pythonanywhere-services.com',
        user='marianav91', 
        password='RojoAzul!', 
        database='marianav91$catalogo'
    )

    cursor = db.cursor()
    cursor.execute("DELETE FROM libros WHERE id = %s", (id,))

    db.commit()
    cursor.close()
    return jsonify({"mensaje":"LIBRO ELIMINADO CON EXITO!!!"})


#post 
@app.route('/agregar_libro', methods=['POST'])
def crear_libro():
    info = request.json
    
    db = mysql.connector.connect(
        host='marianav91.mysql.pythonanywhere-services.com',
        user='marianav91', 
        password='RojoAzul!', 
        database='marianav91$catalogo'
    )

    cursor = db.cursor()
    cursor.execute("INSERT INTO libros(nombre,autor,editorial,edicion) VALUES(%s,%s,%s,%s)", (info["nombre"],info["autor"],info["editorial"],info["edicion"])) 

    db.commit()
    cursor.close()
    return jsonify({"mensaje":"LIBRO AGREGADO CON EXITO!!!"})



#put 
@app.route('/actualizar_libro/<int:id>', methods=['PUT'])
def modificar_libro(id):
    info = request.json
    
    db = mysql.connector.connect(
        host='marianav91.mysql.pythonanywhere-services.com',
        user='marianav91', 
        password='RojoAzul!', 
        database='marianav91$catalogo'
    )

    cursor = db.cursor()
    cursor.execute("UPDATE libros SET nombre= %s, autor= %s, editorial= %s, edicion= %s WHERE id = %s", (info["nombre"],info["autor"],info["editorial"],info["edicion"], id)) 

    db.commit()
    cursor.close()
    return jsonify({"mensaje":"LIBRO ACTUALIZADO CON EXITO!!!"})


if __name__ == '__main__':
    app.run(debug=True)

