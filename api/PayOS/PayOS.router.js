// Init router
const router = require("express").Router();
const {
    paymentLinkRes,
  paymentLink,
  cancelledPaymentLink,
} = require("./PayOS.controller");

router.post("/payos/payment-link", paymentLinkRes);
router.get("/payos/payment-link/:id", paymentLink);
router.get("/payos/payment-link/cancel/:id", cancelledPaymentLink);

module.exports = router;