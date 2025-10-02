'use strict'

var express = require('express');
var ProjectController = require('../controllers/project');

var router = express.Router();

//Mirar todos los videojuegos
router.get('/home', ProjectController.home);

//Crear
router.post('/save', ProjectController.saveData);

//Un videojuego por su id
router.get('/videojuego/:id', ProjectController.getVideojuego);

//Actualizar
router.put('/videojuego/:id', ProjectController.updateVideojuego);

//Borrar
router.delete('/videojuego/:id', ProjectController.deleteVideojuego);
module.exports = router;