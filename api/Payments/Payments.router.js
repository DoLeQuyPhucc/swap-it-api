const express = require("express");
const {
  createPayment,
  getAllPayments,
  getPaymentById,
 
} = require("./Payments.controller");
const authenticateToken = require("../../src/authMiddleware");
const router = express.Router();

router.post("/payments", createPayment);
router.get("/payments", getAllPayments);
router.get("/payments/:id", getPaymentById);


module.exports = router;
