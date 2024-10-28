const express = require("express");
const {
  createMessage,
  getAllMessages,
  getMessageById,
  updateMessageDetails,
  deleteMessage,
} = require("./Messages.controller");
const authenticateToken = require("../../src/authMiddleware");
const router = express.Router();

router.post("/messages", createMessage);
router.get("/messages", getAllMessages);
router.get("/messages/:id", getMessageById);
router.put("/messages/:id", updateMessageDetails);
router.delete("/messages/:id", deleteMessage);

module.exports = router;
