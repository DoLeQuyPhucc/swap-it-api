const express = require('express');
const { createTransaction, getAllTransactions, updateTransactionDetails, getTransactionById, deleteTransaction } = require('./Transactions.controller');
const authenticateToken = require('../../src/authMiddleware');
const router = express.Router();

router.post('/transactions', authenticateToken, createTransaction);
router.get('/transactions', authenticateToken, getAllTransactions);
router.put('/transactions/:id', authenticateToken, updateTransactionDetails);
router.get('/transactions/:id', authenticateToken, getTransactionById);
router.delete('/transactions/:id', authenticateToken, deleteTransaction);

module.exports = router;