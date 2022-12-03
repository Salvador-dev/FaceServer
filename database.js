// importar funciones mysql
const mysql = require('mysql');

// logueo a la base de datos en phpmyadmin de xamp
const mysqlConnection = mysql.createConnection({

    host: 'localhost', // servidor de xamp
    user: 'root', // usuario basico
    password: '', // no se establecio 
    database: 'uploaddb', // base de datos donde se va a trabajar
    multipleStatements: true,

});

// conectar con la base de datos
mysqlConnection.connect(function(err) {

    if (err) {

        console.log(err);
        return;

    } else {

        console.log('DATABASE onLine...');

    }

});

// exportar modulo
module.exports = mysqlConnection;