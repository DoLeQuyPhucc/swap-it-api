const {
  create,
  getAll,
  getById,
  update,
  deleteById,
} = require("./Transactions.service");

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Transaction management
 */

/**
 * @swagger
 * /api/v1/transactions:
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               buyer_id:
 *                 type: integer
 *                 description: The ID of the buyer
 *                 example: 1
 *               seller_id:
 *                 type: integer
 *                 description: The ID of the seller
 *                 example: 2
 *               item_id:
 *                 type: integer
 *                 description: The ID of the item
 *                 example: 3
 *               transaction_date:
 *                 type: string
 *                 format: date
 *                 description: The date of the transaction
 *                 example: "2023-10-01"
 *               transaction_status:
 *                 type: string
 *                 description: The status of the transaction
 *                 example: "Pending"
 *               total_amount:
 *                 type: number
 *                 format: float
 *                 description: The total amount of the transaction
 *                 example: 999.99
 *     responses:
 *       200:
 *         description: Transaction created successfully
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
 *                   example: "Transaction created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     transaction_id:
 *                       type: integer
 *                       example: 1
 */
const createTransaction = async (req, res) => {
  const body = req.body;
  try {
    const results = await create(body);
    return res.status(200).json({
      success: 1,
      message: "Transaction created successfully",
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
 * /api/v1/transactions:
 *   get:
 *     summary: Retrieve a list of transactions
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: A list of transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   transaction_id:
 *                     type: integer
 *                     description: The transaction ID
 *                     example: 1
 *                   buyer_id:
 *                     type: integer
 *                     description: The ID of the buyer
 *                     example: 1
 *                   seller_id:
 *                     type: integer
 *                     description: The ID of the seller
 *                     example: 2
 *                   item_id:
 *                     type: integer
 *                     description: The ID of the item
 *                     example: 3
 *                   transaction_date:
 *                     type: string
 *                     format: date
 *                     description: The date of the transaction
 *                     example: "2023-10-01"
 *                   transaction_status:
 *                     type: string
 *                     description: The status of the transaction
 *                     example: "Pending"
 *                   total_amount:
 *                     type: number
 *                     format: float
 *                     description: The total amount of the transaction
 *                     example: 999.99
 */
const getAllTransactions = async (req, res) => {
  try {
    const results = await getAll();
    return res.status(200).json({
      success: 1,
      message: "Transactions retrieved successfully",
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
 * /api/v1/transactions/{id}:
 *   get:
 *     summary: Retrieve a transaction by ID
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The transaction ID
 *     responses:
 *       200:
 *         description: Transaction retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 transaction_id:
 *                   type: integer
 *                   description: The transaction ID
 *                   example: 1
 *                 buyer_id:
 *                   type: integer
 *                   description: The ID of the buyer
 *                   example: 1
 *                 seller_id:
 *                   type: integer
 *                   description: The ID of the seller
 *                   example: 2
 *                 item_id:
 *                   type: integer
 *                   description: The ID of the item
 *                   example: 3
 *                 transaction_date:
 *                   type: string
 *                   format: date
 *                   description: The date of the transaction
 *                   example: "2023-10-01"
 *                 transaction_status:
 *                   type: string
 *                   description: The status of the transaction
 *                   example: "Pending"
 *                 total_amount:
 *                   type: number
 *                   format: float
 *                   description: The total amount of the transaction
 *                   example: 999.99
 */
const getTransactionById = async (req, res) => {
  const transactionId = req.params.id;
  try {
    const results = await getById(transactionId);
    return res.status(200).json({
      success: 1,
      message: "Transaction retrieved successfully",
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
 * /api/v1/transactions/{id}:
 *   put:
 *     summary: Update transaction details
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The transaction ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               buyer_id:
 *                 type: integer
 *                 description: The ID of the buyer
 *                 example: 1
 *               seller_id:
 *                 type: integer
 *                 description: The ID of the seller
 *                 example: 2
 *               item_id:
 *                 type: integer
 *                 description: The ID of the item
 *                 example: 3
 *               transaction_date:
 *                 type: string
 *                 format: date
 *                 description: The date of the transaction
 *                 example: "2023-10-01"
 *               transaction_status:
 *                 type: string
 *                 description: The status of the transaction
 *                 example: "Pending"
 *               total_amount:
 *                 type: number
 *                 format: float
 *                 description: The total amount of the transaction
 *                 example: 999.99
 *     responses:
 *       200:
 *         description: Transaction updated successfully
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
 *                   example: "Updated transaction successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     transaction_id:
 *                       type: integer
 *                       example: 1
 */
const updateTransactionDetails = async (req, res) => {
  const body = req.body;
  const transactionId = req.params.id;
  try {
    const results = await update(body, transactionId);
    return res.status(200).json({
      success: 1,
      message: "Updated transaction successfully",
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
 * /api/v1/transactions/{id}:
 *   delete:
 *     summary: Delete a transaction by ID
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The transaction ID
 *     responses:
 *       200:
 *         description: Transaction deleted successfully
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
 *                   example: "Transaction deleted successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     transaction_id:
 *                       type: integer
 *                       example: 1
 */
const deleteTransaction = async (req, res) => {
  const transactionId = req.params.id;
  try {
    const results = await deleteById(transactionId);
    return res.status(200).json({
      success: 1,
      message: "Transaction deleted successfully",
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
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransactionDetails,
  deleteTransaction,
};