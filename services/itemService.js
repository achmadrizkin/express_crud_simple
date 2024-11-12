// services/itemService.js
const itemRepository = require('../repository/itemRepository');

const findAllItems = async () => {
  return await itemRepository.findAllItems();
};

const findItemById = async (id) => {
  return await itemRepository.findItemById(id);
};

const createItem = async (itemData) => {
  return await itemRepository.createItem(itemData);
};

const updateItem = async (id, updatedData) => {
  return await itemRepository.update(id, updatedData);
};

const deleteItem = async (id) => {
  return await itemRepository.remove(id);
};

module.exports = { findAllItems, findItemById, createItem, updateItem, deleteItem };
