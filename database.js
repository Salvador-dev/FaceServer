const mysql = require('mysql');

const mysqlConection = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'uploadBD',
    multipleStatements: true,

});

mysqlConection.connect(function(err) {

    if (err) {

        console.log(err);
        return;

    } else {

        console.log('DATABASE onLine...');

    }

});

module.exports = mysqlConection;