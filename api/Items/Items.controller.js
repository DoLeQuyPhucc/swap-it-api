const {
  create,
  getAll,
  updateItem,
  getItem,
  deleteItemById,
  searchItems,
  getItemsBySellerId,
} = require("./Items.service");

/**
 * @swagger
 * tags:
 *   name: Items
 *   description: Item management
 */

/**
 * @swagger
 * /api/v1/items:
 *   post:
 *     summary: Create a new item
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               seller_id:
 *                 type: integer
 *                 description: The ID of the seller
 *                 example: 1
 *               item_name:
 *                 type: string
 *                 description: The name of the item
 *                 example: "Laptop"
 *               description:
 *                 type: string
 *                 description: The description of the item
 *                 example: "A high-performance laptop"
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The price of the item
 *                 example: 999.99
 *               category:
 *                 type: string
 *                 description: The category of the item
 *                 example: "Electronics"
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the item
 *                 example: 10
 *               posted_date:
 *                 type: string
 *                 format: date
 *                 description: The date the item was posted
 *                 example: "2023-10-01"
 *               item_status:
 *                 type: string
 *                 description: The status of the item
 *                 example: "Available"
 *               image_Items:
 *                 type: string
 *                 description: The URL of the item's image
 *                 example: "http://example.com/image.jpg"
 *     responses:
 *       200:
 *         description: Item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: integer
 *                   example: 1
 *                 message:
 *                   type: string
 *                   example: "Item created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     item_id:
 *                       type: integer
 *                       example: 1
 */
const createItems = async (req, res) => {
  const body = req.body;
  try {
    const results = await create(body);
    return res.status(200).json({
      success: 1,
      message: "Item created successfully",
      data: results,
    });
  } catch (err) {
    return res.status(500).json({
      success: 0,
      message: "Error: " + err.message,
    });
  }
};

/**
 * @swagger
 * /api/v1/items:
 *   get:
 *     summary: Retrieve a list of items
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: A list of items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   item_id:
 *                     type: integer
 *                     description: The item ID
 *                     example: 1
 *                   seller_id:
 *                     type: integer
 *                     description: The ID of the seller
 *                     example: 1
 *                   item_name:
 *                     type: string
 *                     description: The name of the item
 *                     example: "Laptop"
 *                   description:
 *                     type: string
 *                     description: The description of the item
 *                     example: "A high-performance laptop"
 *                   price:
 *                     type: number
 *                     format: float
 *                     description: The price of the item
 *                     example: 999.99
 *                   category:
 *                     type: string
 *                     description: The category of the item
 *                     example: "Electronics"
 *                   quantity:
 *                     type: integer
 *                     description: The quantity of the item
 *                     example: 10
 *                   posted_date:
 *                     type: string
 *                     format: date
 *                     description: The date the item was posted
 *                     example: "2023-10-01"
 *                   item_status:
 *                     type: string
 *                     description: The status of the item
 *                     example: "Available"
 *                   image_Items:
 *                     type: string
 *                     description: The URL of the item's image
 *                     example: "http://example.com/image.jpg"
 */
const getAllItems = async (req, res) => {
  try {
    const results = await getAll();
    return res.status(200).json({
      success: 1,
      message: "Items retrieved successfully",
      data: results,
    });
  } catch (err) {
    return res.status(500).json({
      success: 0,
      message: "Error: " + err.message,
    });
  }
};

/**
 * @swagger
 * /api/v1/items/{id}:
 *   put:
 *     summary: Update item details
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               seller_id:
 *                 type: integer
 *                 description: The ID of the seller
 *                 example: 1
 *               item_name:
 *                 type: string
 *                 description: The name of the item
 *                 example: "Laptop"
 *               description:
 *                 type: string
 *                 description: The description of the item
 *                 example: "A high-performance laptop"
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The price of the item
 *                 example: 999.99
 *               category:
 *                 type: string
 *                 description: The category of the item
 *                 example: "Electronics"
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the item
 *                 example: 10
 *               posted_date:
 *                 type: string
 *                 format: date
 *                 description: The date the item was posted
 *                 example: "2023-10-01"
 *               item_status:
 *                 type: string
 *                 description: The status of the item
 *                 example: "Available"
 *               image_Items:
 *                 type: string
 *                 description: The URL of the item's image
 *                 example: "http://example.com/image.jpg"
 *     responses:
 *       200:
 *         description: Item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: integer
 *                   example: 1
 *                 message:
 *                   type: string
 *                   example: "Updated item successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     item_id:
 *                       type: integer
 *                       example: 1
 */
const updateItemDetails = async (req, res) => {
  const body = req.body;
  const itemId = req.params.id;
  try {
    const results = await updateItem(body, itemId);
    return res.status(200).json({
      success: 1,
      message: "Updated item successfully",
      data: results,
    });
  } catch (err) {
    return res.status(500).json({
      success: 0,
      message: "Error: " + err.message,
    });
  }
};

/**
 * @swagger
 * /api/v1/items/{id}:
 *   get:
 *     summary: Retrieve an item by ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The item ID
 *     responses:
 *       200:
 *         description: Item retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 item_id:
 *                   type: integer
 *                   description: The item ID
 *                   example: 1
 *                 seller_id:
 *                   type: integer
 *                   description: The ID of the seller
 *                   example: 1
 *                 item_name:
 *                   type: string
 *                   description: The name of the item
 *                   example: "Laptop"
 *                 description:
 *                   type: string
 *                   description: The description of the item
 *                   example: "A high-performance laptop"
 *                 price:
 *                   type: number
 *                   format: float
 *                   description: The price of the item
 *                   example: 999.99
 *                 category:
 *                   type: string
 *                   description: The category of the item
 *                   example: "Electronics"
 *                 quantity:
 *                   type: integer
 *                   description: The quantity of the item
 *                   example: 10
 *                 posted_date:
 *                   type: string
 *                   format: date
 *                   description: The date the item was posted
 *                   example: "2023-10-01"
 *                 item_status:
 *                   type: string
 *                   description: The status of the item
 *                   example: "Available"
 *                 image_Items:
 *                   type: string
 *                   description: The URL of the item's image
 *                   example: "http://example.com/image.jpg"
 */
const getItemByID = async (req, res) => {
  const itemId = req.params.id;
  try {
    const results = await getItem(itemId);
    return res.status(200).json({
      success: 1,
      message: "Item retrieved successfully",
      data: results,
    });
  } catch (err) {
    return res.status(500).json({
      success: 0,
      message: "Error: " + err.message,
    });
  }
};

/**
 * @swagger
 * /api/v1/items/{id}:
 *   delete:
 *     summary: Delete an item by ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The item ID
 *     responses:
 *       200:
 *         description: Item deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: integer
 *                   example: 1
 *                 message:
 *                   type: string
 *                   example: "Item is deleted successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     item_id:
 *                       type: integer
 *                       example: 1
 */
const deleteItem = async (req, res) => {
  const itemId = req.params.id;
  try {
    const results = await deleteItemById(itemId);
    return res.status(200).json({
      success: 1,
      message: "Item is deleted successfully",
      data: results,
    });
  } catch (err) {
    return res.status(500).json({
      success: 0,
      message: "Error: " + err.message,
    });
  }
};

/**
 * @swagger
 * /api/v1/items/search:
 *   get:
 *     summary: Search for items
 *     tags: [Items]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: The search term
 *     responses:
 *       200:
 *         description: A list of items matching the search term
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   item_id:
 *                     type: integer
 *                     description: The item ID
 *                     example: 1
 *                   seller_id:
 *                     type: integer
 *                     description: The ID of the seller
 *                     example: 1
 *                   item_name:
 *                     type: string
 *                     description: The name of the item
 *                     example: "Laptop"
 *                   description:
 *                     type: string
 *                     description: The description of the item
 *                     example: "A high-performance laptop"
 *                   price:
 *                     type: number
 *                     format: float
 *                     description: The price of the item
 *                     example: 999.99
 *                   category:
 *                     type: string
 *                     description: The category of the item
 *                     example: "Electronics"
 *                   quantity:
 *                     type: integer
 *                     description: The quantity of the item
 *                     example: 10
 *                   posted_date:
 *                     type: string
 *                     format: date
 *                     description: The date the item was posted
 *                     example: "2023-10-01"
 *                   item_status:
 *                     type: string
 *                     description: The status of the item
 *                     example: "Available"
 *                   image_Items:
 *                     type: string
 *                     description: The URL of the item's image
 *                     example: "http://example.com/image.jpg"
 */
const searchItemsDetails = async (req, res) => {
  const searchTerm = req.query.q;
  try {
    const results = await searchItems(searchTerm);
    return res.status(200).json({
      success: 1,
      data: results,
    });
  } catch (err) {
    return res.status(500).json({
      success: 0,
      message: "Error: " + err.message,
    });
  }
};

const itemsRequestExchange = async (req, res) => {
  const itemId = req.params.itemId;
  const sellerId = req.params.userId;
  try {
    const itemsBySellerId = await getItemsBySellerId(sellerId);
    const itemExchange = await getItem(itemId);

    const results = {
      itemsBySellerId,
      itemExchange,
    };
    return res.status(200).json({
      success: 1,
      message: "Item created successfully",
      data: results,
    });
  } catch (err) {
    return res.status(500).json({
      success: 0,
      message: "Error: " + err.message,
    });
  }
};

module.exports = {
  createItems,
  getAllItems,
  updateItemDetails,
  getItemByID,
  deleteItem,
  searchItemsDetails,
  itemsRequestExchange,
};
