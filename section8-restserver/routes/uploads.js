const { Router } = require('express')
const { check } = require('express-validator')

const { validarCampos } = require('../middlewares/validar-campos')
const { cargarArchivo, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads')
const { coleccionesPermitidas } = require('../helpers/db-validators')
const { validarArchivoSubir } = require('../middlewares/validar-archivo')

const router = Router()

router.post('/', validarArchivoSubir, cargarArchivo)

router.put('/:coleccion/:id',[
  check('id', 'El id no es valido (mongodb)').isMongoId(),
  validarArchivoSubir,
  check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos'])),
  validarCampos
], actualizarImagenCloudinary)

router.get('/:coleccion/:id', [
  check('id', 'El id no es valido (mongodb)').isMongoId(),
  check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos'])),
  validarCampos
], mostrarImagen)

module.exports = router