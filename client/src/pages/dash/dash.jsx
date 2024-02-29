import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import getCurrentUser from '../../utils/getCurrentUser';
import newRequest from '../../utils/newRequest';
import "./dash.scss";

function Dash() {
  const currentUser = getCurrentUser();
  const navigate = useNavigate();

  const [filteredBookings, setFilteredBookings] = useState([]);

  const { isLoading: bookingsLoading, error: bookingsError, data: bookingsData } = useQuery({
    queryKey: ["bookings"],
    queryFn: () =>
      newRequest.get('/bookings/').then((res) => {
        return res.data;
      }),
  });

  const { isLoading: gigsLoading, error: gigsError, data: gigsData } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      newRequest.get('/gigs').then((res) => {
        return res.data;
      }),
  });

  useEffect(() => {
    if (bookingsData && gigsData) {
      const currentUserGigs = gigsData.filter(gig => gig.userId === currentUser._id);
      if (currentUserGigs.length > 0) {
        const gigIds = currentUserGigs.map(gig => gig._id);
        const filtered = bookingsData.filter(booking => gigIds.includes(booking.gigId) && booking.status !== 'rejected');
        setFilteredBookings(filtered);
      }
    }
  }, [bookingsData, gigsData, currentUser._id]);

  const getGigInfo = (gigId) => {
    if (!gigsData || gigsData.length === 0) {
      return { title: "N/A", desc: "N/A" };
    }

    const gig = gigsData.find((gig) => gig._id === gigId);
    return gig ? { title: gig.title, desc: gig.desc } : { title: "N/A", desc: "N/A" };
  };

  const handleAccept = async (requestId) => {
    try {
      await newRequest.put(`/bookings/requests/accept/${requestId}`);
      // Update the state immediately upon accepting
      setFilteredBookings(prevBookings => prevBookings.map(booking => (booking._id === requestId ? { ...booking, status: 'accepted' } : booking)));
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  const handleReject = async (requestId) => {
    try {
      await newRequest.put(`/bookings/requests/reject/${requestId}`);
      // Update the state immediately upon rejecting
      setFilteredBookings(prevBookings => prevBookings.filter(booking => booking._id !== requestId));
      // Optionally, you can update the state to reflect the change in the original bookingsData as well
      //setBookingsData(prevData => prevData.map(booking => (booking._id === requestId ? { ...booking, status: 'rejected' } : booking)));
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  return (
    <div className="request-container">
      <div className="container">
        <h2>Booking Requests</h2>
        <table className="request-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date of Booking</th>
              <th>Phone Number</th>
              <th>Shop Name</th> {/* Add a new column for description */}
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking._id} className="request">
                <td>{booking.name}</td>
                <td>{booking.date}</td>
                <td>{booking.phone}</td>
                <td>{getGigInfo(booking.gigId).desc}</td> {/* Display the description */}
                <td>
                  <div className="button-container">
                    {booking.status === 'accepted' ? (
                      <span>Booked</span>
                    ) : (
                      <>
                        <button onClick={() => handleAccept(booking._id)}>Accept</button>
                        <button onClick={() => handleReject(booking._id)}>Reject</button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dash;
