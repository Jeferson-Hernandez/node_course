const { Router } = require('express')
const { check } = require('express-validator')

const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT, tieneRole } = require('../middlewares')
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias')
const { existeCategoria } = require('../helpers/db-validators')

const router = Router()

//obtener todas las categorias - publico
router.get('/', obtenerCategorias)

//obtener una categoria por id - publico
router.get('/:id', [
  check('id', 'id no valido').isMongoId(),
  check('id').custom(existeCategoria),
  validarCampos
], obtenerCategoria)

//crear categoria - privado - token valido
router.post('/', [
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  validarCampos
], crearCategoria)

//actualizar - privado - token valido
router.put('/:id', [
  validarJWT,
  check('id', 'id no valido').isMongoId(),
  check('id').custom(existeCategoria),
  validarCampos
], actualizarCategoria)

//borrar categoria - admin
router.delete('/:id', [
  validarJWT,
  tieneRole("ADMIN_ROLE"),
  check('id', 'id no valido').isMongoId(),
  check('id').custom(existeCategoria),
  validarCampos
], borrarCategoria)

module.exports = router