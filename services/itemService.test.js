// services/itemService.test.js
const itemService = require('./itemService');
const itemRepository = require('../repository/itemRepository');

// Mock the itemRepository methods
jest.mock('../repository/itemRepository', () => ({
    findAllItems: jest.fn(),
    findItemById: jest.fn(),
    createItem: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
}));

// Reset mocks before each test to ensure isolated tests
beforeEach(() => {
    jest.clearAllMocks();
});

describe('Item Service', () => {
    describe('findAllItems', () => {
        it('should return all items', async () => {
            const mockItems = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
            itemRepository.findAllItems.mockResolvedValue(mockItems);

            const result = await itemService.findAllItems();

            expect(result).toEqual(mockItems);
            expect(itemRepository.findAllItems).toHaveBeenCalledTimes(1);
        });
    });

    describe('findItemById', () => {
        it('should return an item if found', async () => {
            const mockItem = { id: 1, name: 'Item 1' };
            const itemId = 1;
            itemRepository.findItemById.mockResolvedValue(mockItem);

            const result = await itemService.findItemById(itemId);

            expect(result).toEqual(mockItem);
            expect(itemRepository.findItemById).toHaveBeenCalledWith(itemId);
            expect(itemRepository.findItemById).toHaveBeenCalledTimes(1);
        });

        it('should return null if item is not found', async () => {
            const itemId = 999;
            itemRepository.findItemById.mockResolvedValue(null);

            const result = await itemService.findItemById(itemId);

            expect(result).toBeNull();
            expect(itemRepository.findItemById).toHaveBeenCalledWith(itemId);
            expect(itemRepository.findItemById).toHaveBeenCalledTimes(1); // Only 1 call
        });
    });

    describe('createItem', () => {
        it('should create and return the created item', async () => {
            const itemData = { name: 'New Item' };
            const mockItem = { id: 1, ...itemData };
            itemRepository.createItem.mockResolvedValue(mockItem);

            const result = await itemService.createItem(itemData);

            expect(result).toEqual(mockItem);
            expect(itemRepository.createItem).toHaveBeenCalledWith(itemData);
            expect(itemRepository.createItem).toHaveBeenCalledTimes(1);
        });
    });

    describe('updateItem', () => {
        it('should update and return the updated item if found', async () => {
            const itemId = 1;
            const updatedData = { name: 'Updated Item' };
            const mockUpdatedItem = { id: itemId, ...updatedData };
            itemRepository.update.mockResolvedValue(mockUpdatedItem);

            const result = await itemService.updateItem(itemId, updatedData);

            expect(result).toEqual(mockUpdatedItem);
            expect(itemRepository.update).toHaveBeenCalledWith(itemId, updatedData);
            expect(itemRepository.update).toHaveBeenCalledTimes(1);
        });

        it('should return null if item not found for update', async () => {
            const itemId = 999;
            const updatedData = { name: 'Nonexistent Item' };
            itemRepository.update.mockResolvedValue(null);

            const result = await itemService.updateItem(itemId, updatedData);

            expect(result).toBeNull();
            expect(itemRepository.update).toHaveBeenCalledWith(itemId, updatedData);
            expect(itemRepository.update).toHaveBeenCalledTimes(1); // Only 1 call
        });
    });

    describe('deleteItem', () => {
        it('should return true if item was successfully deleted', async () => {
            const itemId = 1;
            itemRepository.remove.mockResolvedValue(true);

            const result = await itemService.deleteItem(itemId);

            expect(result).toBe(true);
            expect(itemRepository.remove).toHaveBeenCalledWith(itemId);
            expect(itemRepository.remove).toHaveBeenCalledTimes(1);
        });

        it('should return false if item not found for deletion', async () => {
            const itemId = 999;
            itemRepository.remove.mockResolvedValue(false);

            const result = await itemService.deleteItem(itemId);

            expect(result).toBe(false);
            expect(itemRepository.remove).toHaveBeenCalledWith(itemId);
            expect(itemRepository.remove).toHaveBeenCalledTimes(1); // Only 1 call
        });
    });
});
