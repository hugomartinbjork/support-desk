import axios from 'axios'

const API_URL = 'api/tickets/'

// Create new ticket
const createTicket = async (ticketData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, ticketData, config)

  if (response.data) {
    localStorage.setItem('ticket', JSON.stringify(response.data))
  }
  return response.data
}

// Get uesr tics
const getTickets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL, config)
  return response.data
}

const ticketService = { createTicket, getTickets }

export default ticketService
