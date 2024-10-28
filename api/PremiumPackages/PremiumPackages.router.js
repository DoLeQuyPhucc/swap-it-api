const express = require("express");
const {
  createPremiumPackage,
  getAllPremiumPackages,
  getPremiumPackageById,
  updatePremiumPackageDetails,
  deletePremiumPackage,
} = require("./PremiumPackages.controller");
const authenticateToken = require("../../src/authMiddleware");
const router = express.Router();

router.post("/premium-packages", createPremiumPackage);
router.get("/premium-packages", getAllPremiumPackages);
router.get("/premium-packages/:id", getPremiumPackageById);
router.put("/premium-packages/:id", updatePremiumPackageDetails);
router.delete("/premium-packages/:id", deletePremiumPackage);

module.exports = router;
