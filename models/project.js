'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = Schema({
    name: String,
    description: String,
    category: String,
    year: Number,
    studio: String
});

module.exports = mongoose.model('videojuegos', ProjectSchema); //Con videojuegos se crea la coleccion en Mongo