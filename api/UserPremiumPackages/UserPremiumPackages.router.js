const express = require("express");
const {
  createUserPremiumTransaction,
  getAllUserPremiumTransactions,
  getUserPremiumTransactionById,
  updateUserPremiumTransactionDetails,
  deleteUserPremiumTransaction,
} = require("./UserPremiumPackages.controller");
const authenticateToken = require("../../src/authMiddleware");
const router = express.Router();

router.post("/user-premium-transactions", createUserPremiumTransaction);
router.get("/user-premium-transactions", getAllUserPremiumTransactions);
router.get("/user-premium-transactions/:id", getUserPremiumTransactionById);
router.put(
  "/user-premium-transactions/:id",
  updateUserPremiumTransactionDetails
);
router.delete("/user-premium-transactions/:id", deleteUserPremiumTransaction);

module.exports = router;
