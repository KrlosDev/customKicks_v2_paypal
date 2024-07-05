import express from 'express';
const router = express.Router();
import {
  getCustomizations,
  getCustomizationById,
  createCustomization,
  updateCustomization,
  deleteCustomization,
} from '../controllers/customizationController'; // Assuming 'customizationController.js' exists

// Public routes (no authentication required)
router.get('/', getCustomizations); // Get all customizations

// Routes requiring authentication (middleware not shown but assumed)
router.get('/:id', getCustomizationById); // Get a specific customization

// Protected routes (user must be authenticated)
router.post('/', createCustomization); // Create a new customization
router.put('/:id', updateCustomization); // Update a customization
router.delete('/:id', deleteCustomization); // Delete a customization

export default router;
