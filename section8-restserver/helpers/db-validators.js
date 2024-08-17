const Role = require('../models/role')
const { Usuario, Categoria, Producto } = require('../models')

const esRoleValido = async(rol = '') => {
    const rolExist = await Role.findOne({rol})
    if (!rolExist) {
        throw new Error(`El rol ${rol} no esta registrado en la BD`)
    }
}

const emailExiste = async(correo = '') => {
    const emailExist = await Usuario.findOne({correo})
    if (emailExist) {
        throw new Error(`El correo ${correo} ya se encuentra registrado`)
    }
}

const existeUsuarioPorId = async(id) => {
    const usuarioExist = await Usuario.findById(id)
    if (!usuarioExist) {
        throw new Error(`El id ${id} no existe`)
    }
}

const existeCategoria = async(id) => {
  const categoriaExist = await Categoria.findById(id) 
  if (!categoriaExist) {
    throw new Error(`El id de la categoria no existe`)
  }
}

const existeProducto = async(id) => {
  const productoExist = await Producto.findById(id) 
  if (!productoExist) {
    throw new Error(`El id del producto no existe`)
  }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoria,
    existeProducto
}