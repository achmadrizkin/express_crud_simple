// routes/itemRoutes.js
const express = require('express');
const itemController = require('../controllers/itemController');

const router = express.Router();

// Define route without the `/api/items` prefix, as it's already applied in `index.js`
router.get('/', itemController.findAllItems);
router.get('/:id', itemController.findItemById);
router.post('/', itemController.createItem);
router.put('/:id', itemController.updateItem);
router.delete('/:id', itemController.deleteItem);

module.exports = router;
