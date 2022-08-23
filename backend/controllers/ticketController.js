const asyncHandler = require('express-async-handler')

const Ticket = require('../models/ticketModel')

// @desc   GET USER TICKETS
// @route  GET /api/tickets
// @access Private
const getTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find({ user: req.user.id })
  res.status(200).json(tickets)
})

// @desc   update ticket
// @route  PUT /api/tickets/:id
// @access Private
const getTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id)
  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  if (ticket.user.toString() !== req.user.id) {
    console.log(ticket.user.id)
    res.status(401)
    throw new Error('Not Authorized')
  }

  res.status(200).json(ticket)
})

const updateTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id)
  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  if (ticket.user.toString() !== req.user.id) {
    console.log(ticket.user.id)
    res.status(401)
    throw new Error('Not Authorized')
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  )

  res.status(200).json(updatedTicket)
})

// @desc   DELETE TICKET
// @route  DELETE /api/tickets/:id
// @access Private
const deleteTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id)
  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  if (ticket.user.toString() !== req.user.id) {
    console.log(ticket.user.id)
    res.status(401)
    throw new Error('Not Authorized')
  }
  await ticket.delete()
  res.status(200).json({ success: true })
})

// @desc   CREATE NEW TICKET
// @route   POST /api/tickets
// @access Private
const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body
  console.log(req.body)

  if (!product || !description) {
    console.log(2134234214)
    res.status(400)
    throw new Error('Please add a product and description')
  }

  const ticket = await Ticket.create({
    user: req.user.id,
    product,
    description,
    status: 'new',
  })
  res.status(201).json(ticket)
})

module.exports = {
  getTickets,
  createTicket,
  getTicket,
  deleteTicket,
  updateTicket,
}
