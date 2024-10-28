const express = require("express");
const {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePaymentDetails,
  deletePayment,
} = require("./Payments.controller");
const authenticateToken = require("../../src/authMiddleware");
const router = express.Router();

router.post("/payments", createPayment);
router.get("/payments", getAllPayments);
router.get("/payments/:id", getPaymentById);
router.put("/payments/:id", updatePaymentDetails);
router.delete("/payments/:id", deletePayment);

module.exports = router;
