import asyncHandler from '../middleware/asyncHandler.js'; // Assuming asyncHandler is in 'middleware' folder
import Customization from '../models/customizationModel.js';

// @desc    Fetch all customizations
// @route   GET /api/customizations
// @access  Public
const getCustomizations = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT || 10; // Default to 10 per page
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        fullName: { $regex: req.query.keyword, $options: 'i' }, // Case-insensitive search
      }
    : {};

  const count = await Customization.countDocuments({ ...keyword });
  const customizations = await Customization.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ customizations, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch a single customization by ID
// @route   GET /api/customizations/:id
// @access  Public
const getCustomizationById = asyncHandler(async (req, res) => {
  const customization = await Customization.findById(req.params.id);

  if (customization) {
    res.json(customization);
  } else {
    res.status(404).send('Customization not found');
  }
});

// @desc    Create a new customization
// @route   POST /api/customizations
// @access  (Assuming authentication middleware is used here)
const createCustomization = asyncHandler(async (req, res) => {
  const { fullName, cellphone, email, customizationDetails, image } = req.body;

  const newCustomization = new Customization({
    fullName,
    cellphone,
    email,
    customizationDetails,
    image,
  });

  const createdCustomization = await newCustomization.save();
  res.status(201).json(createdCustomization);
});

// @desc    Update a customization
// @route   PUT /api/customizations/:id
// @access  (Assuming authentication middleware is used here)
const updateCustomization = asyncHandler(async (req, res) => {
  const { fullName, cellphone, email, customizationDetails, image } = req.body;

  const customization = await Customization.findById(req.params.id);

  if (customization) {
    customization.fullName = fullName;
    customization.cellphone = cellphone;
    customization.email = email;
    customization.customizationDetails = customizationDetails;
    customization.image = image;

    const updatedCustomization = await customization.save();
    res.json(updatedCustomization);
  } else {
    res.status(404).send('Customization not found');
  }
});

// @desc    Delete a customization
// @route   DELETE /api/customizations/:id
// @access  (Assuming authentication middleware is used here)
const deleteCustomization = asyncHandler(async (req, res) => {
  const customization = await Customization.findByIdAndDelete(req.params.id);

  if (customization) {
    res.json({ message: 'Customization removed' });
  } else {
    res.status(404).send('Customization not found');
  }
});

export {
  getCustomizations,
  getCustomizationById,
  createCustomization,
  updateCustomization,
  deleteCustomization,
};