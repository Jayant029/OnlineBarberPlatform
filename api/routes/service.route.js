// routes/serviceRoutes.js
import express from "express";
import { getAllServices, addService, editService, deleteService } from "../controllers/service.controller.js";

const router = express.Router();
// Get all services
router.get('/', getAllServices);

// Add a new service
router.post('/', addService);

router.put('/:id', editService);

router.delete('/:id',deleteService);

export default router;
