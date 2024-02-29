// controllers/serviceController.js

import Service from "../models/service.model.js";

export const getAllServices = async (req, res) => {
    try {
      const services = await Service.find();
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Add a new service
 export const addService = async (req, res) => {
    const { name, price, userId } = req.body;
  
    try {
      const newService = new Service({ name, price, userId });
      const savedService = await newService.save();
      res.status(201).json(savedService);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  export const editService = async (req, res) => {
    const { name, price } = req.body;
    const serviceId = req.params.id; // Assuming the service ID is provided in the request parameters
  
    try {
      const updatedService = await Service.findByIdAndUpdate(
        serviceId,
        { name, price },
        { new: true } // Return the modified document rather than the original
      );
  
      if (!updatedService) {
        return res.status(404).json({ message: 'Service not found' });
      }
  
      res.json(updatedService);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  export const deleteService = async (req, res) => {
    const serviceId = req.params.id; // Assuming the service ID is provided in the request parameters
  
    try {
      const deletedService = await Service.findByIdAndRemove(serviceId);
  
      if (!deletedService) {
        return res.status(404).json({ message: 'Service not found' });
      }
  
      res.json({ message: 'Service deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };