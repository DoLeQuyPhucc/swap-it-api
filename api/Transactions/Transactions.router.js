const express = require("express");
const {
  createTransaction,
  getAllTransactions,
  updateTransactionDetails,
  getTransactionById,
  deleteTransaction,
} = require("./Transactions.controller");
const authenticateToken = require("../../src/authMiddleware");
const router = express.Router();

router.post("/transactions", createTransaction);
router.get("/transactions", getAllTransactions);
router.put("/transactions/:id", updateTransactionDetails);
router.get("/transactions/:id", getTransactionById);
router.delete("/transactions/:id", deleteTransaction);

module.exports = router;
