const {createItems, getAllItems, updateItemDetails, getItemByID, deleteItem} = require('./Items.controller');
const authenticateToken = require('../../src/authMiddleware');
const router = require('express').Router();

router.post('/items',createItems);
router.get('/items',authenticateToken,getAllItems);
router.put('/items/:id', updateItemDetails);
router.get('/items/:id', getItemByID);
router.delete('/items/:id', deleteItem);
module.exports = router;


