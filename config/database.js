var mysql = require("mysql");

require("dotenv").config({ path: __dirname + "/../.env" });

var connection = mysql.createConnection({
    host: process.env.host,
    database: process.env.db,
    user: process.env.db_usr,
    password: process.env.db_pwd,
});

connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    //console.log('connected as id ' + connection.threadId);
});

/*
connection.query('SELECT nombres, apellidoPaterno, apellidoMaterno FROM pacientes', function(error, results, fields){
  if (error) throw error;
  //console.log('El nombre del paciente es '+ results[0].nombres + ' '+ results[0].apellidoPaterno + ' ' + results[0].apellidoMaterno);
  //console.log(results);
  //console.log(fields);
  /*
  results.forEach(function(campo) {
    console.log(campo.nombres + ' ' + campo.apellidoPaterno + ' ' + campo.apellidoMaterno);
  });
  /*
  results.forEach(async campo  => {
    const nombres = await campo.nombres;
    console.log(nombres);
  });
});
*/

function getAllRecords() {
    return new Promise(function (resolve, reject) {
        connection.query(
            "SELECT nombres, apellidoPaterno, apellidoMaterno FROM pacientes",
            function (error, results, fields) {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            }
        );
    });
}

getAllRecords()
    .then(function (results) {
        console.log(results);
    })
    .catch((err) => {
        throw err;
    });
