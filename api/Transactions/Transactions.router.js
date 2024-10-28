const express = require("express");
const {
  createTransaction,
  getAllTransactions,
  updateTransactionDetails,
  getTransactionById,
  deleteTransaction,
  getAllByBuyerId,
  getAllBySellerId,
  acceptTransactionId,
} = require("./Transactions.controller");
const authenticateToken = require("../../src/authMiddleware");
const router = express.Router();

router.post("/transactions", createTransaction);
router.get("/transactions", getAllTransactions);
router.put("/transactions/:id", updateTransactionDetails);
router.get("/transactions/:id", getTransactionById);
router.delete("/transactions/:id", deleteTransaction);
router.get("/transactions/buyer/:id", getAllByBuyerId);
router.get("/transactions/seller/:id", getAllBySellerId);
router.put("/transactions/accept/:id", acceptTransactionId);

module.exports = router;
