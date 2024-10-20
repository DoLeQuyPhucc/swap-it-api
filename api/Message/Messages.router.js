const express = require('express');
const {
  createMessage,
  getAllMessages,
  getMessageById,
  updateMessageDetails,
  deleteMessage,
} = require('./Messages.controller');
const authenticateToken = require('../../src/authMiddleware');
const router = express.Router();

router.post('/messages', authenticateToken, createMessage);
router.get('/messages', authenticateToken, getAllMessages);
router.get('/messages/:id', authenticateToken, getMessageById);
router.put('/messages/:id', authenticateToken, updateMessageDetails);
router.delete('/messages/:id', authenticateToken, deleteMessage);

module.exports = router;