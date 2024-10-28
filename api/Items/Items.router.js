const {
  createItems,
  getAllItems,
  updateItemDetails,
  getItemByID,
  deleteItem,
  itemsRequestExchange,
} = require("./Items.controller");
const authenticateToken = require("../../src/authMiddleware");
const router = require("express").Router();

router.post("/items", createItems);
router.get("/items", getAllItems);
router.put("/items/:id", updateItemDetails);
router.get("/items/:id", getItemByID);
router.delete("/items/:id", deleteItem);
router.get("/items/exchange/:userId&:itemId", itemsRequestExchange);

module.exports = router;
