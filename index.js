'use strict';
var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;
var db = 'mongodb://localhost:27017/EjercicioClaseJueves21'; //Donde EjercicioClaseJueves21 es la DB, cambiar ese parametro para insertar en otra

mongoose.Promise = global.Promise;
mongoose.connect(db)
            .then(() => {
                console.log("Conectado a la base de datos");

                //crear servidor
                app.listen(port, ()=>{
                    console.log("Servidor corriendo en http://localhost:"+port);
                })
            })
            .catch(err => console.log(err));