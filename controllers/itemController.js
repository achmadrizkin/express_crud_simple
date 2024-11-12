// controllers/itemController.js
const itemService = require('../services/itemService');
const { createResponse } = require('../models/response');

// Get all items
const findAllItems = async (req, res) => {
  try {
    const items = await itemService.findAllItems();
    res.status(200).json(createResponse(200, 'Items fetched successfully', items));
  } catch (error) {
    res.status(500).json(createResponse(500, 'Failed to fetch items'));
  }
};

// Get item by ID
const findItemById = async (req, res) => {
  try {
    const item = await itemService.findItemById(req.params.id);
    if (item) {
      res.status(200).json(createResponse(200, 'Item fetched successfully', item));
    } else {
      res.status(404).json(createResponse(404, 'Item not found'));
    }
  } catch (error) {
    res.status(500).json(createResponse(500, 'Failed to fetch item'));
  }
};

// Create a new item
const createItem = async (req, res) => {
  try {
    const newItem = await itemService.createItem(req.body);
    res.status(200).json(createResponse(200, 'Item created successfully', newItem));
  } catch (error) {
    res.status(500).json(createResponse(500, 'Failed to create item'));
  }
};

// Update an item
const updateItem = async (req, res) => {
  try {
    const updatedItem = await itemService.updateItem(req.params.id, req.body);
    if (updatedItem) {
      res.status(200).json(createResponse(200, 'Item updated successfully', updatedItem));
    } else {
      res.status(404).json(createResponse(404, 'Item not found'));
    }
  } catch (error) {
    res.status(500).json(createResponse(500, 'Failed to update item'));
  }
};

// Delete an item
const deleteItem = async (req, res) => {
  try {
    const success = await itemService.deleteItem(req.params.id);
    if (success) {
      res.status(200).json(createResponse(200, 'Item deleted successfully'));
    } else {
      res.status(404).json(createResponse(404, 'Item not found'));
    }
  } catch (error) {
    res.status(500).json(createResponse(500, 'Failed to delete item'));
  }
};

module.exports = { findAllItems, findItemById, createItem, updateItem, deleteItem };