var express = require('express');
var router = express.Router();
var app = express();
require('dotenv').config()

//Import mysql module
mysql = require('mysql2')

//CORS
var cors = require('cors');
app.use(cors());
app.listen( 8002, function () {
    console.log('CORS-enabled web server listening on port 8002')
});

// Create connection with PlanetScale remote DB
const connection = mysql.createConnection(process.env.DATABASE_URL)

//setup local database
{/*
db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'universidad',
  debug: false
})
*/}

//setup remote hostinger database
{/*
db = mysql.createPool({
  host: '185.213.81.1',
  user: 'u475078680_moviepop',
  password: 'Root12345',
  database: 'u475078680_moviepop',
  debug: false
})
*/}

/* Alumnos */
//get Alumnos
const getAlumnos = (req, res, next) => {
  let sql = `SELECT IF(nota >= 3 , 'PROMOCIONADO' , 'DESAPROBADO') condicion, alumnos.id, alumnos.nombre, alumnos.apellido, alumnos.anio, materias.materia FROM notas , materias , alumnos WHERE notas.id_materia = materias.id AND notas.id_Alumno = alumnos.id;`;
  connection.query(sql, function (err, data, fields) {
      if (err) throw err;
      res.json(data)
  })
}
router.get('/' , getAlumnos);

module.exports = router;
