const Role = require('../models/role')
const Usuario = require('../models/usuario')

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

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}