import mysql from "mysql";//Se importa el módulo mysql para la conexión con la base de datos.

const connection = mysql.createConnection({//Se crea una conexión con la base de datos haciendo uso de las variables de entorno.
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD
    
});

connection.connect((err) => {//Comprobación si la conexión fue exitosa.
    if(err) {
        console.log("Error al hacer la conexión con la base de datos.");
        throw err;
    }else {
        console.log("Conexión exitosa!");
    }
});

export default connection;//Se exporta la conexión con la base de datos.
