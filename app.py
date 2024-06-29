from flask import Flask, jsonify, request
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app)





#get -> consultar
@app.route('/usuarios', methods=['GET'])
def ver_usuarios():
    db = mysql.connector.connect(
        host='localhost',
        user='root', #mi usuario
        password='240315Mora', #mi contraseña
        database='suscripciones' #nombre de la base de datos
    )

    cursor = db.cursor(dictionary=True) #en lugar de tener una lista con tuplas, tener un diccionario con clave(campo) y valor(dato)
    cursor.execute("SELECT * FROM usuarios")

    usuarios = cursor.fetchall()

    cursor.close()
    return jsonify(usuarios) #generamos un json como respuesta


#delete -> eliminar
#'/eliminar_usuario/1' elimina el registro con id 1
#'/eliminar_usuario/78' elimina el registro con id 78
#'/eliminar_usuario/5' elimina el registro con id 5
@app.route('/eliminar_usuario/<int:id>', methods=['DELETE'])
def eliminar_usuario(id):
    db = mysql.connector.connect(
        host='milepeletay13gg.mysql.pythonanywhere-services.com',
        user='milepeletay13gg', #mi usuario
        password='milonka90', #mi contraseña
        database='milepeletay13gg$comercio' #nombre de la base de datos
    )

    cursor = db.cursor()
    cursor.execute("DELETE FROM usuarios WHERE id = %s", (id,))

    db.commit()
    cursor.close()
    return jsonify({"mensaje":"REGISTRO ELIMINADO CON EXITO!!!"})


#post -> crear un nuevo elemento en el servidor
@app.route('/agregar_usuario', methods=['POST'])
def crear_usuario():
    info = request.json
    
    #info = { "nombre_apellido": "Maria Juarez", "mail": "mj@hotmail.com" , "tarjeta":1005000843664758 , "plan": "Plan Basico" }

    db = mysql.connector.connect(
        host='localhost',
        user='root', #mi usuario
        password='240315Mora', #mi contraseña
        database='suscripciones' #nombre de la base de datos
    )

    cursor = db.cursor()
    cursor.execute("INSERT INTO usuarios(nombre_apellido,mail,tarjeta,plan) VALUES(%s,%s,%s,%s)", (info["nombre_apellido"],info["mail"],info["tarjeta"],info["plan"])) #("monitor", 45 , 100500)

    db.commit()
    cursor.close()
    return jsonify({"mensaje":"USUARIO CREADO CON EXITO!!!"})



#put -> actualizar
@app.route('/actualizar_usuario/<int:id>', methods=['PUT'])
def modificar_usuario(id):
    info = request.json
    
    #info = { "nombre": "monitor", "categoria": 45 , "precio":100500}
    
    db = mysql.connector.connect(
        host='milepeletay13gg.mysql.pythonanywhere-services.com',
        user='milepeletay13gg', #mi usuario
        password='milonka90', #mi contraseña
        database='milepeletay13gg$comercio' #nombre de la base de datos
    )

    cursor = db.cursor()
    cursor.execute("UPDATE usuarios SET nombre= %s, cantidad= %s, precio= %s WHERE id = %s", (info["nombre"],info["cantidad"],info["precio"] , id)) #("monitor", 45 , 100500)

    db.commit()
    cursor.close()
    return jsonify({"mensaje":"REGISTRO ACTUALIZADO CON EXITO!!!"})


if __name__ == '__main__':
    app.run(debug=True)



# from flask import Flask, jsonify
# import mysql.connector
# from flask_cors import CORS 

# app = Flask(__name__)
# CORS(app)

#get -> consultar
#post -> crear un nuevo elemento en el servidor
#delete -> eliminar
#put -> actualizar

 #consultar
@app.route('/usuarios', methods=['GET'])
def ver_usuarios():
     db = mysql.connector.connect(
         host='localhost',
         user='root', #mi usuario
         password='12345', #mi contraseña
         database='comercio' #nombre de la base de datos
     )
    
     cursor = db.cursor(dictionary=True) #en lugar de tener una lista con tuplas, tener un diccionario con clave(campo) y valor(dato)
     cursor.execute("SELECT * FROM usuarios")
    
     usuarios = cursor.fetchall()
    
     cursor.close()
     return jsonify(usuarios) #generamos un json como respuesta
    
if __name__ == '__main__':
     app.run(debug=True) 

