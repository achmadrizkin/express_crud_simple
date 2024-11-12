// itemRepository.test.js
const { findAllItems, findItemById, createItem, updateItem, removeItem } = require('../repository/itemRepository');
const Item = require('../models/Item'); // Import the Item model

// Mocking the Sequelize Item model methods
jest.mock('../models/Item'); // Automatically mocks all methods of the Item model

describe('Item Repository', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clears all mock calls after each test
    });

    test('findAllItems should return all items', async () => {
        const mockItems = [
            { id: 1, name: 'Item 1', description: 'Description 1' },
            { id: 2, name: 'Item 2', description: 'Description 2' }
        ];

        // Mock the findAll method to return mockItems
        Item.findAll.mockResolvedValue(mockItems);

        const items = await findAllItems();

        expect(Item.findAll).toHaveBeenCalledTimes(1); // Ensure the method was called once
        expect(items).toEqual(mockItems); // Ensure the correct value is returned
    });

    test('findItemById should return an item by ID', async () => {
        const mockItem = { id: 1, name: 'Item 1', description: 'Description 1' };

        // Mock the findByPk method to return mockItem
        Item.findByPk.mockResolvedValue(mockItem);

        const item = await findItemById(1);

        expect(Item.findByPk).toHaveBeenCalledWith(1); // Ensure findByPk is called with the correct ID
        expect(item).toEqual(mockItem); // Ensure the correct value is returned
    });

    test('createItem should create and return a new item', async () => {
        const newItem = { name: 'New Item', description: 'New Description' };
        const createdItem = { ...newItem, id: 1 };

        // Mock the create method to return the created item
        Item.create.mockResolvedValue(createdItem);

        const item = await createItem(newItem);

        expect(Item.create).toHaveBeenCalledWith(newItem); // Ensure create is called with the correct data
        expect(item).toEqual(createdItem); // Ensure the correct item is returned
    });

    test('updateItem should update an existing item', async () => {
        const mockItem = { id: 1, name: 'Old Item', description: 'Old Description' };
        const updatedData = { name: 'Updated Item', description: 'Updated Description' };
        const updatedItem = { ...mockItem, ...updatedData };

        // Mock the findByPk method to return the mockItem
        Item.findByPk.mockResolvedValue(mockItem);

        // Mock the update method to return the updated item
        mockItem.update = jest.fn().mockResolvedValue(updatedItem);

        const item = await updateItem(1, updatedData);

        expect(Item.findByPk).toHaveBeenCalledWith(1); // Ensure the correct ID is passed to findByPk
        expect(mockItem.update).toHaveBeenCalledWith(updatedData); // Ensure update is called with the correct data
        expect(item).toEqual(updatedItem); // Ensure the updated item is returned
    });

    test('removeItem should delete an item and return true', async () => {
        const mockItem = { id: 1, name: 'Item 1', description: 'Description 1' };

        // Mock the findByPk method to return the mockItem
        Item.findByPk.mockResolvedValue(mockItem);

        // Mock the destroy method to simulate deletion
        mockItem.destroy = jest.fn().mockResolvedValue(true);

        const result = await removeItem(1);

        expect(Item.findByPk).toHaveBeenCalledWith(1); // Ensure findByPk is called with the correct ID
        expect(mockItem.destroy).toHaveBeenCalled(); // Ensure destroy is called
        expect(result).toBe(true); // Ensure the result is true (indicating successful deletion)
    });

    test('removeItem should return false if item is not found', async () => {
        // Mock the findByPk method to return null (item not found)
        Item.findByPk.mockResolvedValue(null);

        const result = await removeItem(1);

        expect(Item.findByPk).toHaveBeenCalledWith(1); // Ensure findByPk is called with the correct ID
        expect(result).toBe(false); // Ensure the result is false (indicating item was not found)
    });
});
