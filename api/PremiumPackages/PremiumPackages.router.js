const express = require('express');
const { createPremiumPackage, getAllPremiumPackages, getPremiumPackageById, updatePremiumPackageDetails, deletePremiumPackage } = require('./PremiumPackages.controller');
const authenticateToken = require('../../src/authMiddleware');
const router = express.Router();

router.post('/premium-packages', authenticateToken, createPremiumPackage);
router.get('/premium-packages', authenticateToken, getAllPremiumPackages);
router.get('/premium-packages/:id', authenticateToken, getPremiumPackageById);
router.put('/premium-packages/:id', authenticateToken, updatePremiumPackageDetails);
router.delete('/premium-packages/:id', authenticateToken, deletePremiumPackage);

module.exports = router;