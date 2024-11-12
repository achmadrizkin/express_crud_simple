// database_test.js
const { sequelize, connectToDatabase } = require('./database');
const { Sequelize } = require('sequelize');

jest.mock('sequelize', () => {
  const SequelizeMock = jest.fn().mockImplementation(() => ({
    authenticate: jest.fn(),
    sync: jest.fn(),
  }));

  return { Sequelize: SequelizeMock };
});

describe('Database Connection Tests', () => {
  beforeEach(() => {
    // Reset mocks before each test
    sequelize.authenticate.mockClear();
    sequelize.sync.mockClear();
  });

  test('should connect to the database successfully', async () => {
    // Mock authenticate and sync to resolve without errors
    sequelize.authenticate.mockResolvedValue();
    sequelize.sync.mockResolvedValue();

    // Call connectToDatabase and check expected calls
    await connectToDatabase();

    expect(sequelize.authenticate).toHaveBeenCalled();
    expect(sequelize.sync).toHaveBeenCalled();
    console.log('Database connected and synchronized successfully');
  });

  test('should handle database connection error', async () => {
    // Mock authenticate to throw an error
    const error = new Error('Connection failed');
    sequelize.authenticate.mockRejectedValue(error);

    // Spy on console.error to check for error message
    console.error = jest.fn();

    // Call connectToDatabase and catch error handling
    await connectToDatabase();

    expect(sequelize.authenticate).toHaveBeenCalled();
    expect(sequelize.sync).not.toHaveBeenCalled(); // sync should not be called if authenticate fails
    expect(console.error).toHaveBeenCalledWith('Unable to connect to the database:', error);
  });
});
