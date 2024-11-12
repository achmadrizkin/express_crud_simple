// controllers/itemController.test.js
const itemController = require('./itemController');
const itemService = require('../services/itemService');
const { createResponse } = require('../models/response');

// Mocking dependencies
jest.mock('../services/itemService');
jest.mock('../models/response');

describe('Item Controller', () => {
    const mockRes = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };

    beforeEach(() => {
        jest.clearAllMocks(); // Ensure mocks are reset before each test
    });

    describe('findAllItems', () => {
        it('should return 200 and items on success', async () => {
            const mockItems = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
            itemService.findAllItems.mockResolvedValue(mockItems);
            createResponse.mockReturnValue({ success: true, data: mockItems });

            const req = {};
            const res = mockRes();

            await itemController.findAllItems(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                data: mockItems,
            });
        });

        it('should return 500 if there is an error', async () => {
            const errorMessage = 'Failed to fetch items';
            itemService.findAllItems.mockRejectedValue(new Error(errorMessage));
            createResponse.mockReturnValue({ success: false, message: errorMessage });

            const req = {};
            const res = mockRes();

            await itemController.findAllItems(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: `Failed to fetch items`,
            });
        });
    });

    describe('findItemById', () => {
        it('should return 200 and item when found', async () => {
            const mockItem = { id: 1, name: 'Item 1' };
            const itemId = 1;
            itemService.findItemById.mockResolvedValue(mockItem);
            createResponse.mockReturnValue({ success: true, data: mockItem });

            const req = { params: { id: itemId } };
            const res = mockRes();

            await itemController.findItemById(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                data: mockItem,
            });
        });

        it('should return 404 if item is not found', async () => {
            const itemId = 999;
            itemService.findItemById.mockResolvedValue(null);
            createResponse.mockReturnValue({ success: false, message: 'Item not found' });

            const req = { params: { id: itemId } };
            const res = mockRes();

            await itemController.findItemById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'Item not found',
            });
        });

        it('should return 500 if there is an error', async () => {
            const errorMessage = 'Failed to fetch item';
            itemService.findItemById.mockRejectedValue(new Error(errorMessage));
            createResponse.mockReturnValue({ success: false, message: errorMessage });

            const req = { params: { id: 1 } };
            const res = mockRes();

            await itemController.findItemById(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: `Failed to fetch item`,
            });
        });
    });

    describe('createItem', () => {
        it('should return 200 and created item', async () => {
            const newItem = { name: 'New Item' };
            const mockCreatedItem = { id: 1, ...newItem };
            itemService.createItem.mockResolvedValue(mockCreatedItem);
            createResponse.mockReturnValue({ success: true, data: mockCreatedItem });

            const req = { body: newItem };
            const res = mockRes();

            await itemController.createItem(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                data: mockCreatedItem,
            });
        });

        it('should return 500 if there is an error', async () => {
            const errorMessage = 'Failed to create item';
            itemService.createItem.mockRejectedValue(new Error(errorMessage));
            createResponse.mockReturnValue({ success: false, message: errorMessage });

            const req = { body: { name: 'New Item' } };
            const res = mockRes();

            await itemController.createItem(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'Failed to create item',
            });
        });
    });

    describe('updateItem', () => {
        it('should return 200 and updated item if found', async () => {
            const itemId = 1;
            const updatedData = { name: 'Updated Item' };
            const mockUpdatedItem = { id: itemId, ...updatedData };
            itemService.updateItem.mockResolvedValue(mockUpdatedItem);
            createResponse.mockReturnValue({ success: true, data: mockUpdatedItem });

            const req = { params: { id: itemId }, body: updatedData };
            const res = mockRes();

            await itemController.updateItem(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                data: mockUpdatedItem,
            });
        });

        it('should return 404 if item not found for update', async () => {
            const itemId = 999;
            const updatedData = { name: 'Nonexistent Item' };
            itemService.updateItem.mockResolvedValue(null);
            createResponse.mockReturnValue({ success: false, message: 'Item not found' });

            const req = { params: { id: itemId }, body: updatedData };
            const res = mockRes();

            await itemController.updateItem(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'Item not found',
            });
        });

        it('should return 500 if there is an error', async () => {
            const errorMessage = 'Failed to update item';
            itemService.updateItem.mockRejectedValue(new Error(errorMessage));
            createResponse.mockReturnValue({ success: false, message: errorMessage });

            const req = { params: { id: 1 }, body: { name: 'Updated Item' } };
            const res = mockRes();

            await itemController.updateItem(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'Failed to update item',
            });
        });
    });

    describe('deleteItem', () => {
        it('should return 200 if item deleted successfully', async () => {
            const itemId = 1;
            itemService.deleteItem.mockResolvedValue(true);
            createResponse.mockReturnValue({ success: true, message: 'Item deleted successfully' });

            const req = { params: { id: itemId } };
            const res = mockRes();

            await itemController.deleteItem(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                message: 'Item deleted successfully',
            });
        });

        it('should return 404 if item not found for deletion', async () => {
            const itemId = 999;
            itemService.deleteItem.mockResolvedValue(false);
            createResponse.mockReturnValue({ success: false, message: 'Item not found' });

            const req = { params: { id: itemId } };
            const res = mockRes();

            await itemController.deleteItem(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'Item not found',
            });
        });

        it('should return 500 if there is an error', async () => {
            const errorMessage = 'Failed to delete item';
            itemService.deleteItem.mockRejectedValue(new Error(errorMessage));
            createResponse.mockReturnValue({ success: false, message: errorMessage });

            const req = { params: { id: 1 } };
            const res = mockRes();

            await itemController.deleteItem(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'Failed to delete item',
            });
        });
    });
});
