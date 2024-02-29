import React, { useEffect, useState } from "react";
import getCurrentUser from '../../utils/getCurrentUser';
import "./services.scss";

const Services = () => {
  const [servicesData, setServicesData] = useState([]);
  const [newService, setNewService] = useState({ name: "", price: 0 });
  const [showAddServiceForm, setShowAddServiceForm] = useState(false);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(null);
  const currentUser = getCurrentUser();

  const fetchServices = async () => {
    try {
      const response = await fetch(`http://localhost:8800/api/services?userId=${currentUser._id}`);
      if (response.ok) {
        const data = await response.json();
        setServicesData(data);
      } else {
        console.error("Error fetching services:", response.status);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [currentUser]);

  const handleAddService = () => {
    setNewService({ name: "", price: 0 });
    setShowAddServiceForm(true);
    setSelectedServiceIndex(null);
  };

  const handleEditService = (index) => {
    setNewService({ name: servicesData[index].name, price: servicesData[index].price });
    setShowAddServiceForm(true);
    setSelectedServiceIndex(index);
  };

  const handleDeleteService = async () => {
    try {
      if (selectedServiceIndex !== null) {
        const serviceId = servicesData[selectedServiceIndex]._id;
        const response = await fetch(`http://localhost:8800/api/services/${serviceId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          console.log('Service deleted successfully');
          setNewService({ name: "", price: 0 });
          setShowAddServiceForm(false);
          setSelectedServiceIndex(null);
          fetchServices();
        } else {
          console.error('Failed to delete service');
        }
      }
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const handleCancel = () => {
    setNewService({ name: "", price: 0 });
    setShowAddServiceForm(false);
    setSelectedServiceIndex(null);
  };

  const handleFormSubmit = async () => {
    try {
      const userId = currentUser._id;

      if (newService.name && newService.price >= 0) {
        if (selectedServiceIndex !== null) {
          const response = await fetch(`http://localhost:8800/api/services/${servicesData[selectedServiceIndex]._id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...newService, userId }),
          });

          if (response.ok) {
            console.log('Service updated successfully');
            setSelectedServiceIndex(null);
          } else {
            console.error('Failed to update service');
          }
        } else {
          const response = await fetch(`http://localhost:8800/api/services/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...newService, userId }),
          });

          if (response.ok) {
            console.log('Service added successfully');
          } else {
            console.error('Failed to add service');
          }
        }

        setNewService({ name: "", price: 0 });
        setShowAddServiceForm(false);
        fetchServices();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="barber-services-container">
      {showAddServiceForm ? (
        <div className="add-service-form">
          <input
            type="text"
            name="name"
            placeholder="Service Name"
            value={newService.name}
            onChange={(e) => setNewService({ ...newService, name: e.target.value })}
          />
          <input
            type="number"
            name="price"
            placeholder="Service Price"
            value={newService.price}
            onChange={(e) => setNewService({ ...newService, price: Math.max(0, parseFloat(e.target.value)) })}
          />
          <div className="button-row">
            <button onClick={handleFormSubmit}>
              {selectedServiceIndex !== null ? 'Update Service' : 'Add Service'}
            </button>
            {selectedServiceIndex !== null && (
              <>
                <button onClick={handleDeleteService}>Delete Service</button>
                <button onClick={handleCancel}>Cancel</button>
              </>
            )}
          </div>
        </div>
      ) : (
        <button onClick={handleAddService}>
          Add Service
        </button>
      )}

      <table className="services-table">
        <thead>
          <tr>
            <th>Service Name</th>
            <th>Service Price</th>
            {selectedServiceIndex !== null && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {servicesData.map((service, index) => (
            <tr key={service._id} onClick={() => setSelectedServiceIndex(index)}>
              <td>{service.name}</td>
              <td>{service.price}</td>
              {selectedServiceIndex === index && (
                <td>
                  <button onClick={() => handleEditService(index)}>
                    Edit
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Services;
