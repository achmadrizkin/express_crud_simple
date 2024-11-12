// ./database/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Set up the Sequelize instance using environment variables
const sequelize = new Sequelize(
  process.env.SQL_DB,
  process.env.SQL_USER,
  process.env.SQL_PASSWORD,
  {
    host: process.env.SQL_HOST,
    port: process.env.SQL_PORT,
    dialect: 'mysql',
    logging: false, // Disable logging; enable if debugging
  }
);

// Test the database connection
async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    // Run migrations automatically
    await sequelize.sync(); 
    console.log('Database synchronized.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = { sequelize, connectToDatabase };
