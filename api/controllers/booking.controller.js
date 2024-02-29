// booking.controller.js
import BookingModel from "../models/booking.model.js";


export const createBooking = async (req, res) => {
  try {
    console.log('Received booking data:', req.body); // Log the received data

    // Destructure fields from the request body
    const { date, gigId,selleruserId, buyeruserId, name, phone, status, new: isNew } = req.body;

    // Validate or sanitize data if needed

    // Create a new BookingModel instance with extracted fields
    const newBooking = new BookingModel({ date, gigId,selleruserId, buyeruserId, name, phone, status, new: isNew });

    // Save the new booking
    await newBooking.save();

    // Respond with success message
    res.status(201).json({ message: 'Booking created successfully' });
  } catch (error) {
    // Handle errors
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};


export const deleteBookingById = async (req, res) => {
  try {
    const { bookId } = req.params;

    if (!bookId) {
      return res.status(400).json({ message: 'Booking ID is required in the request parameters' });
    }

    const deletedBooking = await BookingModel.findByIdAndDelete(bookId);

    if (!deletedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({ message: 'Booking deleted successfully', deletedBooking });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const getBookings = async (req, res, next) => {
  try {
    // Retrieve all bookings from the database
    const bookings = await BookingModel.find();

    // Send the bookings as a response
    res.status(200).json(bookings);
  } catch (error) {
    // If an error occurs, pass it to the error handling middleware
    next(error);
}
};


// Get booking requests for a specific user
export const getBookingRequests = async (req, res) => {
  try {
    const { userId } = req.params;
    const requests = await BookingModel.find({ userId: userId });
    res.status(200).json(requests);
  } catch (error) {
    console.error('Error fetching booking requests:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Accept a booking request
export const acceptBookingRequest = async (req, res) => {
  const { bookingId } = req.params; // Assuming the booking ID is received from request params

  try {
    const booking = await BookingModel.findByIdAndUpdate(bookingId, { status: 'accepted' }, { new: true });
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // If you need to do something after the booking is updated successfully
    // For example, send a response indicating success
    res.status(200).json({ message: 'Booking status updated to accepted successfully', booking });
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Reject a booking request
export const rejectBookingRequest = async (req, res) => {
  const { requestId } = req.params;

  try {
    const booking = await BookingModel.findByIdAndUpdate(
      requestId,
      { status: 'rejected' },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({ message: 'Booking status updated to rejected successfully', booking });
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

