const { response, request } = require("express");
const { Producto } = require("../models");

const obtenerProductos = async (req = request, res = response) => {
  const { limit = 5, skip = 0 } = req.query

  const [total, productos] = await Promise.all([
    Producto.countDocuments({ estado: true }),
    Producto.find({ estado: true })
      .populate("usuario", "nombre correo")
      .populate("categoria", "nombre")
      .skip(skip)
      .limit(limit)
  ])

  res.json({
    productos,
    total
  })
}

const obtenerProducto = async (req = request, res = response) => {
  const { id } = req.params
  const categoria = await Producto.findById(id)
    .populate("usuario", "nombre correo")
    .populate("categoria", "nombre")

  res.json(categoria)
}

const crearProducto = async (req = request, res = response) => {
  const { estado, usuario, ...data } = req.body

  if (data.nombre) {
    data.nombre = data.nombre.toUpperCase()
  }

  const productoDB = await Producto.findOne({ nombre: data.nombre })

  if (productoDB) {
    return res.status(400).json({
      msg: `El producto: ${productoDB.nombre}, ya existe`
    })
  }

  data.usuario = req.userAuthenticated._id

  const producto = new Producto(data)

  await producto.save()
  res.status(201).json(producto)
}

const actualizarProducto = async (req = request, res = response) => {
  const { id } = req.params
  const { estado, usuario, ...data } = req.body

  if (data.nombre) {
    data.nombre = data.nombre.toUpperCase()
  }

  data.usuario = req.userAuthenticated._id

  const producto = await Producto.findOneAndUpdate({ _id: id }, data, { returnDocument: 'after' })

  res.json(producto)
}

const borrarProducto = async (req = request, res = response) => {
  const { id } = req.params

  const producto = await Producto.findOneAndUpdate({ _id: id }, { estado: false }, { returnDocument: 'after' })

  res.json(producto)
}

module.exports = {
  actualizarProducto,
  crearProducto,
  borrarProducto,
  obtenerProducto,
  obtenerProductos
}