// item.test.js
const { Sequelize, DataTypes } = require('sequelize');
const Item = require('../models/Item'); // Adjust path based on your file structure

// Create an in-memory SQLite database for testing
const sequelize = new Sequelize('sqlite::memory:', { logging: false });

// Re-define the Item model using the in-memory Sequelize instance
const ItemModel = sequelize.define('Item', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
});

beforeAll(async () => {
    // Sync all models
    await sequelize.sync();
});

afterAll(async () => {
    // Close the connection after tests
    await sequelize.close();
});

describe('Item Model', () => {
    test('should create an item successfully', async () => {
        const itemData = { name: 'Item 1', description: 'Description of Item 1' };

        const item = await ItemModel.create(itemData);

        expect(item.id).toBeDefined(); // Check if id is auto-generated
        expect(item.name).toBe(itemData.name); // Check the name field
        expect(item.description).toBe(itemData.description); // Check the description field
    });

    test('should fail to create an item without a name', async () => {
        const itemData = { description: 'Description of Item 2' };

        try {
            await ItemModel.create(itemData);
        } catch (error) {
            expect(error.name).toBe('SequelizeValidationError');
            expect(error.errors[0].message).toBe('Item.name cannot be null');
        }
    });

    test('should create an item with null description', async () => {
        const itemData = { name: 'Item 3', description: null };

        const item = await ItemModel.create(itemData);

        expect(item.id).toBeDefined(); // Check if id is auto-generated
        expect(item.name).toBe(itemData.name); // Check the name field
        expect(item.description).toBeNull(); // Ensure description is allowed to be null
    });

    test('should update an item successfully', async () => {
        const itemData = { name: 'Item 4', description: 'Description of Item 4' };
        const item = await ItemModel.create(itemData);

        const updatedData = { name: 'Updated Item 4', description: 'Updated description' };
        await item.update(updatedData);

        const updatedItem = await ItemModel.findByPk(item.id);

        expect(updatedItem.name).toBe(updatedData.name); // Check if name was updated
        expect(updatedItem.description).toBe(updatedData.description); // Check if description was updated
    });

    test('should delete an item successfully', async () => {
        const itemData = { name: 'Item 5', description: 'Description of Item 5' };
        const item = await ItemModel.create(itemData);

        await item.destroy(); // Destroy the item

        const deletedItem = await ItemModel.findByPk(item.id);

        expect(deletedItem).toBeNull();
    });
});
