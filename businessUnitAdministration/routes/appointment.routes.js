
const express = require('express')
const appointment = require('../controller/appointment.controller')
const bookingRoutes = express.Router()

bookingRoutes
       .post('/create',appointment.postcreateBooking)
       .get('/BookingByDate',appointment.getBookingByDate)
       .get('/getAvailability',appointment.getAvailability)

module.exports = bookingRoutes