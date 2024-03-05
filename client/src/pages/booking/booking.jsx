import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './booking.scss';
import getCurrentUser from '../../utils/getCurrentUser';
import newRequest from '../../utils/newRequest';


const Booking = () => {
  const currentUser = getCurrentUser();
  const { gigId } = useParams();
  const [selectedGigId, setSelectedGigId] = useState(gigId);
  const [selectedDateTime, setSelectedDateTime] = useState(getFormattedDateTime(new Date()));
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [gigDetails, setGigDetails] = useState(null);
  

  useEffect(() => {
    const fetchGigDetails = async () => {
      try {
        // Make a GET request to fetch gig details by ID
        const response = await newRequest.get(`/gigs/single/${gigId}`); // Adjust the endpoint as per your backend route
        setGigDetails(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching gig details:', error);
      }
    };

    fetchGigDetails();

    // Cleanup function to prevent memory leaks
    return () => {
      // Any cleanup code, if needed
    };
  }, [gigId]);

  // useEffect(() => {
  //   if (currentUser) {
  //     setUserId(currentUser._id);
  //   }
  // }, [currentUser]);

  useEffect(() => {
    console.log('Selected Gig ID:', selectedGigId);
    // ... (other useEffect code)
  }, [selectedGigId]);

  const handleDateTimeChange = (e) => {
    setError('');
    setSelectedDateTime(e.target.value);
  };

  const handleNameChange = (e) => {
    setError('');
    setCustomerName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setError('');
    setCustomerPhone(e.target.value);
  };

  const handleSubmit = async () => {
    const selectedDateTimeObject = new Date(selectedDateTime);

    if (selectedDateTimeObject <= new Date()) {
      setError('Please select a date and time after the current time.');
      return;
    }

    if (!customerName || !customerPhone) {
      setError('Please fill in all the fields.');
      return;
    }
    
    //  console.log(gigDetails);
    //  console.log(gigDetails._id);
    //  console.log(currentUser._id)
    try {
      // Check if buyeruserId is empty
      if (!currentUser || !currentUser._id) {
        // Display a message and provide a way to log in
        alert('Please login to proceed.'); // You can use a more sophisticated modal/popup component here
        // Redirect to the login page
        // Note: Make sure to import `useNavigate` from 'react-router-dom'
        navigate('/login');
        return;
      }

      // If buyeruserId is not empty, proceed with the booking submission
      const response = await fetch(`http://localhost:8800/api/bookings/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: selectedDateTimeObject,
          selleruserId : gigDetails.userId,
          gigId: selectedGigId,
          buyeruserId: currentUser._id,
          name: customerName,
          phone: customerPhone,
          status: 'pending', // Adjust as needed
          new: true, // Adjust as needed
        }),
      });

      console.log('Response:', response);

      if (response.ok) {
        console.log('Booking submitted successfully');
        setSelectedDateTime(getFormattedDateTime(new Date()));
        setCustomerName('');
        setCustomerPhone('');
  
        // Display an alert for successful booking
        alert('Booking submitted successfully!');
  
        // Redirect to the dashboard page
        navigate('/orders');
      } else {
        console.error('Failed to submit booking');
        setError('Failed to submit booking. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      setError('An error occurred. Please try again.');
    }
  };

  function getFormattedDateTime(date) {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    const hours = `${date.getHours()}`.padStart(2, '0');
    const minutes = `${date.getMinutes()}`.padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  return (
    <div className="booking-container">
      <h1>Book Now</h1>

      {error && <div className="error-message">{error}</div>}

      <label>Date and Time</label>
      <input
        type="datetime-local"
        value={selectedDateTime}
        onChange={handleDateTimeChange}
        min={getFormattedDateTime(new Date())}
      />

      <br />

      <label>Name</label>
      <input type="text" value={customerName} onChange={handleNameChange} />

      <br />

      <label>Phone</label>
      <input type="tel" value={customerPhone} onChange={handlePhoneChange} />

      <br />
      <div className="button-container">
        <button onClick={handleSubmit}>Book Now</button>
      </div>
    </div>
  );
};

export default Booking;

