import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import "./Orders.scss";
import getCurrentUser from "../../utils/getCurrentUser";

const Orders = () => {
  const currentUser = getCurrentUser();
  const currentUserId = currentUser._id;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading, error, data: bookingsData } = useQuery({
    queryKey: ["bookings"],
    queryFn: () =>
      newRequest.get(`/bookings`).then((res) => {
        return res.data;
      }),
  });
 
  console.log(bookingsData)
  console.log(currentUserId)
  const { data: gigsData, error: gigsError } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      newRequest.get(`/gigs`).then((res) => {
        return res.data;
      }),
  });

  const [filteredBookings, setFilteredBookings] = useState([]);

  useEffect(() => {
    if (bookingsData && gigsData) {
      const filtered = bookingsData.filter((booking) => booking.buyeruserId === currentUserId);
      setFilteredBookings(filtered);
    }
  }, [bookingsData, gigsData, currentUserId]);

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/bookings/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["bookings"]);
    },
  });

  const getGigInfo = (gigId) => {
    if (!gigsData || gigsData.length === 0) {
      return { title: "N/A", desc: "N/A" };
    }

    const gig = gigsData.find((gig) => gig._id === gigId);
    return gig ? { title: gig.title, desc: gig.desc } : { title: "N/A", desc: "N/A" };
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      mutation.mutate(id);
    }
  };

  const handleContact = async (booking) => {
    const sellerId = booking.selleruserId; 
    const buyerId = booking.buyeruserId; 
    const id = sellerId + buyerId;
    console.log(sellerId);
    console.log(buyerId);
    console.log(id);
  
    try {
      const res = await newRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      console.error("Error fetching conversation:", err.message);
  
      if (err.response && err.response.status === 404) {
        try {
          const res = await newRequest.post(`/conversations/`, {
            to: currentUser.seller ? buyerId : sellerId,
          });
          navigate(`/message/${res.data.id}`);
        } catch (error) {
          console.error("Error creating conversation:", error.message);
        }
      }
    }
  };

  return (
    <div className="bookings">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Bookings</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>Date and Time</th>
                <th>Address</th>
                <th>Shop Name</th>
                <th>Status</th>
                <th>Action</th>
                <th>Message</th> {/* New column for chat option */}
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.date}</td>
                  <td>{getGigInfo(booking.gigId).title}</td>
                  <td>{getGigInfo(booking.gigId).desc}</td>
                  <td>{booking.status}</td>
                  <td>
                    {booking.status === "accepted" ? (
                      <span className="booked">Booked</span>
                    ) : (
                      <img
                        className="delete"
                        src="./delete.png"
                        alt=""
                        onClick={() => handleDelete(booking._id)}
                      />
                    )}
                  </td>
                  <td>
                    {booking.status === "accepted" && (
                      <img
                        className="message"
                        src="../../message.png"
                        alt=""
                        onClick={() => handleContact(booking)}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
