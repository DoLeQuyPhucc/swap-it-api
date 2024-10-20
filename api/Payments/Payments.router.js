const express = require('express');
const { createPayment, getAllPayments, getPaymentById, updatePaymentDetails, deletePayment } = require('./Payments.controller');
const authenticateToken = require('../../src/authMiddleware');
const router = express.Router();

router.post('/payments', authenticateToken, createPayment);
router.get('/payments', getAllPayments);
router.get('/payments/:id', authenticateToken, getPaymentById);
router.put('/payments/:id', authenticateToken, updatePaymentDetails);
router.delete('/payments/:id', authenticateToken, deletePayment);

module.exports = router;