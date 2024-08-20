const TicketControl = require("../models/ticket-control")

const ticketControl = new TicketControl()

const socketController = socket => {

  socket.emit('ultimo-ticket', ticketControl.ultimo)
  socket.emit('estado-actual', ticketControl.ultimos4)
  socket.emit('tickets-pendientes', ticketControl.tickets.length)

  socket.on('siguiente-ticket', (payload, callback) => {
    const siguiente = ticketControl.siguiente()
    socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length)
    callback(siguiente)

    //TODO: notificar que hay un nuevo ticket
  })

  socket.on('atender-ticket', ({ escritorio }, callback) => {
    if (!escritorio) {
      return callback({
        ok: false,
        msg: 'El escritorio es obligatorio'
      })
    }

    const ticket = ticketControl.atenderTicket(escritorio)
    socket.broadcast.emit('estado-actual', ticketControl.ultimos4)
    //envia el pendiente al mismo socket y a los demas con el broadcast
    // socket.emit('tickets-pendientes', ticketControl.tickets.length)
    socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length)

    if (!ticket) {
      callback({
        ok: false,
        msg: 'No hay tickets pendientes'
      })
    } else {
      callback({
        ok: true,
        pendientes: ticketControl.tickets.length,
        ticket
      })
    }
  })
}

module.exports = {
  socketController
}