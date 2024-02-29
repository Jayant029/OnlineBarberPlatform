// routes/bookingRoutes.js
import express from "express";
import { createBooking, deleteBookingById, getBookings, getBookingRequests, acceptBookingRequest, rejectBookingRequest } from "../controllers/booking.controller.js";

const router = express.Router();


router.post('/', createBooking);
router.delete('/:bookId', deleteBookingById);
router.get('/', getBookings);

router.get('/requests/:userId', getBookingRequests);

// Route to accept a booking request
router.put('/requests/accept/:bookingId', acceptBookingRequest);

// Route to reject a booking request
router.put('/requests/reject/:requestId', rejectBookingRequest);


export default router;
	

