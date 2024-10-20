const express = require('express');
const {
  createUserPremiumTransaction,
  getAllUserPremiumTransactions,
  getUserPremiumTransactionById,
  updateUserPremiumTransactionDetails,
  deleteUserPremiumTransaction,
} = require('./UserPremiumPackages.controller');
const authenticateToken = require('../../src/authMiddleware');
const router = express.Router();

router.post('/user-premium-transactions', authenticateToken, createUserPremiumTransaction);
router.get('/user-premium-transactions', authenticateToken, getAllUserPremiumTransactions);
router.get('/user-premium-transactions/:id', authenticateToken, getUserPremiumTransactionById);
router.put('/user-premium-transactions/:id', authenticateToken, updateUserPremiumTransactionDetails);
router.delete('/user-premium-transactions/:id', authenticateToken, deleteUserPremiumTransaction);

module.exports = router;