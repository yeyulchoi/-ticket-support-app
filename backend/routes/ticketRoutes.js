const express = require('express')
const router =express.Router()
const {getTickets, createTicket, getSingleTicket, deleteTicket,updateTicket} =require('../controller/ticketController')
const {protect} =require('../middleware/authMiddleware')

//re-route into note route
const noteRoute = require('./noteRoute')
router.use('/:ticketId/notes',noteRoute)

// concise and organized way to define routes that share the same path but have different HTTP methods
router.route('/').get(protect, getTickets).post(protect, createTicket)
router.route('/:id').get(protect, getSingleTicket).delete(protect,deleteTicket)
.put(protect,updateTicket)


module.exports =router