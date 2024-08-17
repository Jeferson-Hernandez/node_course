const { Router } = require('express')
const { check } = require('express-validator')

const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT, tieneRole } = require('../middlewares')
const {  existeProducto } = require('../helpers/db-validators')
const { obtenerProducto, obtenerProductos, crearProducto, actualizarProducto, borrarProducto } = require('../controllers/productos')

const router = Router()

//obtener todas las producto - publico
router.get('/', obtenerProductos)

//obtener una producto por id - publico
router.get('/:id', [
  check('id', 'id no valido').isMongoId(),
  check('id').custom(existeProducto),
  validarCampos
], obtenerProducto)

//crear producto - privado - token valido
router.post('/', [
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('categoria', 'id no valido').isMongoId(),
  check('precio', 'El precio debe ser numero').isNumeric(),
  validarCampos
], crearProducto)

//actualizar - privado - token valido
router.put('/:id', [
  validarJWT,
  check('id', 'id no valido').isMongoId(),
  check('id').custom(existeProducto),
  validarCampos
], actualizarProducto)

//borrar producto - admin
router.delete('/:id', [
  validarJWT,
  tieneRole("ADMIN_ROLE"),
  check('id', 'id no valido').isMongoId(),
  check('id').custom(existeProducto),
  validarCampos
], borrarProducto)

module.exports = router