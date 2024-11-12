// repositories/itemRepository.js
const Item = require('../models/Item');

// Use findItemById instead of findById
const findAllItems = async () => {
  return await Item.findAll();
};

const findItemById = async (id) => {
  return await Item.findByPk(id);
};

const createItem = async (itemData) => {
  return await Item.create(itemData);
};

const updateItem = async (id, updatedData) => {
  // Replace findById with findItemById
  const item = await findItemById(id);  // Corrected here
  if (item) {
    return await item.update(updatedData);
  }
  return null;
};

const removeItem = async (id) => {
  // Replace findById with findItemById
  const item = await findItemById(id);  // Corrected here
  if (item) {
    await item.destroy();
    return true;
  }
  return false;
};

module.exports = { findAllItems, findItemById, createItem, updateItem, removeItem };
