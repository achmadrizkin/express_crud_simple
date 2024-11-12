// index.js
const express = require('express');
require('dotenv').config();
const { connectToDatabase } = require('./config/database');
const itemRoutes = require('./routes/itemRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize database connection
connectToDatabase();

// Use item routes with `/api/items` as base path
app.use('/api/items', itemRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
