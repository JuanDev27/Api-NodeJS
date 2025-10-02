'use strict'
const { get } = require('mongoose');
var Project = require('../models/project');
var controller = {
    home: async function (req, res) {
        try {
            const videojuegos = await Project.find({});

            if (!videojuegos || videojuegos.length === 0) {
                return res.status(404).send({ message: 'No hay videojuegos que mostrar.' });
            }

            return res.status(200).send({ videojuegos });
        } catch (err) {
            return res.status(500).send({ message: 'Error al devolver los datos.', error: err.message });
        }
    },

    //agregar un videojuego
    saveData: async function (req, res) {
        try {
            var project = new Project();
            var params = req.body;

            project.name = params.name;
            project.description = params.description;
            project.category = params.category;
            project.year = params.year;
            project.studio = params.studio;

            const projectStored = await project.save();

            if (!projectStored) {
                return res.status(404).send({ message: 'No se ha podido guardar el videojuego.' });
            }

            return res.status(200).send({ project: projectStored });

        } catch (err) {
            return res.status(500).send({ message: 'Error al guardar el documento.', error: err.message });
        }
    },

    //Obtener un videojuego por su id
    getVideojuego: async function (req, res) {
        try {
            const videojuegoId = req.params.id;

            if (!videojuegoId) {
                return res.status(404).send({ message: 'El videojuego no existe.' });
            }

            const videojuego = await Project.findById(videojuegoId);

            if (!videojuego) {
                return res.status(404).send({ message: 'El videojuego no existe.' });
            }

            return res.status(200).send({ videojuego });

        } catch (err) {
            return res.status(500).send({ message: 'Error al devolver los datos.', error: err.message });
        }
    },

    //Actualizar videojuego
    updateVideojuego: async function (req, res) {
        try {
            const videojuegoId = req.params.id;
            const update = req.body;

            const videojuegoUpdated = await Project.findByIdAndUpdate(
                videojuegoId,
                update,
                { new: true }
            );

            if (!videojuegoUpdated) {
                return res.status(404).send({ message: 'No existe el videojuego para actualizar' });
            }

            return res.status(200).send({ videojuego: videojuegoUpdated });

        } catch (err) {
            return res.status(500).send({ message: 'Error al actualizar', error: err.message });
        }
    },

    //Borrar proyecto
    deleteVideojuego: function (req, res) {
        const videojuegoId = req.params.id;

        Project.findByIdAndDelete(videojuegoId)
            .then(projectRemoved => {
                if (!projectRemoved) {
                    return res.status(404).send({ message: 'No se puede eliminar ese videojuego.' });
                }
                return res.status(200).send({ project: projectRemoved });
            })
            .catch(err => {
                return res.status(500).send({ message: 'Error al borrar el videojuego.', error: err.message });
            });
    }

}
module.exports = controller;