const socketController = socket => {
  console.log('Cliente conectado')
  socket.on('disconnect', () => {
    // console.log('Cliente desconectado')
  })

  //callback la referencia a una fn del front-end:
  // socket.emit('enviar-mensaje', payload, (id) => {
  //   console.log('Desde el server', id)
  // })

  socket.on('enviar-mensaje', (payload, callback) => {
    const id = 123456086
    callback(id)
    //this.io manda el mensaje a todos los conectados
    // this.io.emit('enviar-mensaje', payload)
    //broadcast envia mensaje a todos los sockets excepto el que lo envió
    socket.broadcast.emit('enviar-mensaje', payload)
  })
}

module.exports = {
  socketController
}