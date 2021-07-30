const mysql = require("mysql");

const configDB = mysql.createConnection({
  user: "root",
  password: "",
  host: "localhost",
  database: "api_rest_bebetter",
});

configDB.connect(function (error) {
  if (error) {
    console.log('Error de Conexion', error)
  } 
});

module.exports = configDB;
