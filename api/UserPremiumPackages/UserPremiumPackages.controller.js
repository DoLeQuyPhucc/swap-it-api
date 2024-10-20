const {
    create,
    getAll,
    getById,
    update,
    deleteById,
  } = require('./UserPremiumPackages.service');
  
  /**
   * @swagger
   * tags:
   *   name: UserPremiumTransactions
   *   description: User premium transaction management
   */
  
  /**
   * @swagger
   * /api/v1/user-premium-transactions:
   *   post:
   *     summary: Create a new user premium transaction
   *     tags: [UserPremiumTransactions]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               user_id:
   *                 type: integer
   *                 description: The ID of the user
   *                 example: 1
   *               package_id:
   *                 type: integer
   *                 description: The ID of the premium package
   *                 example: 2
   *               purchase_date:
   *                 type: string
   *                 format: date
   *                 description: The date of purchase
   *                 example: "2023-10-01"
   *               expiry_date:
   *                 type: string
   *                 format: date
   *                 description: The expiry date of the premium package
   *                 example: "2023-11-01"
   *     responses:
   *       200:
   *         description: User premium transaction created successfully
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
   *                   example: "User premium transaction created successfully"
   *                 data:
   *                   type: object
   *                   properties:
   *                     transaction_id:
   *                       type: integer
   *                       example: 1
   */
  const createUserPremiumTransaction = async (req, res) => {
    const body = req.body;
    try {
      const results = await create(body);
      return res.status(200).json({
        success: 1,
        message: "User premium transaction created successfully",
        data: results
      });
    } catch (err) {
      return res.status(500).json({
        success: 0,
        message: "Error: " + err.message
      });
    }
  };
  
  /**
   * @swagger
   * /api/v1/user-premium-transactions:
   *   get:
   *     summary: Retrieve a list of user premium transactions
   *     tags: [UserPremiumTransactions]
   *     responses:
   *       200:
   *         description: A list of user premium transactions
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
   *                   user_id:
   *                     type: integer
   *                     description: The ID of the user
   *                     example: 1
   *                   package_id:
   *                     type: integer
   *                     description: The ID of the premium package
   *                     example: 2
   *                   purchase_date:
   *                     type: string
   *                     format: date
   *                     description: The date of purchase
   *                     example: "2023-10-01"
   *                   expiry_date:
   *                     type: string
   *                     format: date
   *                     description: The expiry date of the premium package
   *                     example: "2023-11-01"
   */
  const getAllUserPremiumTransactions = async (req, res) => {
    try {
      const results = await getAll();
      return res.status(200).json({
        success: 1,
        message: "User premium transactions retrieved successfully",
        data: results
      });
    } catch (err) {
      return res.status(500).json({
        success: 0,
        message: "Error: " + err.message
      });
    }
  };
  
  /**
   * @swagger
   * /api/v1/user-premium-transactions/{id}:
   *   get:
   *     summary: Retrieve a user premium transaction by ID
   *     tags: [UserPremiumTransactions]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: The transaction ID
   *     responses:
   *       200:
   *         description: User premium transaction retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 transaction_id:
   *                   type: integer
   *                   description: The transaction ID
   *                   example: 1
   *                 user_id:
   *                   type: integer
   *                   description: The ID of the user
   *                   example: 1
   *                 package_id:
   *                   type: integer
   *                   description: The ID of the premium package
   *                   example: 2
   *                 purchase_date:
   *                   type: string
   *                   format: date
   *                   description: The date of purchase
   *                   example: "2023-10-01"
   *                 expiry_date:
   *                   type: string
   *                   format: date
   *                   description: The expiry date of the premium package
   *                   example: "2023-11-01"
   */
  const getUserPremiumTransactionById = async (req, res) => {
    const transactionId = req.params.id;
    try {
      const results = await getById(transactionId);
      return res.status(200).json({
        success: 1,
        message: "User premium transaction retrieved successfully",
        data: results
      });
    } catch (err) {
      return res.status(500).json({
        success: 0,
        message: "Error: " + err.message
      });
    }
  };
  
  /**
   * @swagger
   * /api/v1/user-premium-transactions/{id}:
   *   put:
   *     summary: Update user premium transaction details
   *     tags: [UserPremiumTransactions]
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
   *               user_id:
   *                 type: integer
   *                 description: The ID of the user
   *                 example: 1
   *               package_id:
   *                 type: integer
   *                 description: The ID of the premium package
   *                 example: 2
   *               purchase_date:
   *                 type: string
   *                 format: date
   *                 description: The date of purchase
   *                 example: "2023-10-01"
   *               expiry_date:
   *                 type: string
   *                 format: date
   *                 description: The expiry date of the premium package
   *                 example: "2023-11-01"
   *     responses:
   *       200:
   *         description: User premium transaction updated successfully
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
   *                   example: "Updated user premium transaction successfully"
   *                 data:
   *                   type: object
   *                   properties:
   *                     transaction_id:
   *                       type: integer
   *                       example: 1
   */
  const updateUserPremiumTransactionDetails = async (req, res) => {
    const body = req.body;
    const transactionId = req.params.id;
    try {
      const results = await update(body, transactionId);
      return res.status(200).json({
        success: 1,
        message: "Updated user premium transaction successfully",
        data: results
      });
    } catch (err) {
      return res.status(500).json({
        success: 0,
        message: "Error: " + err.message
      });
    }
  };
  
  /**
   * @swagger
   * /api/v1/user-premium-transactions/{id}:
   *   delete:
   *     summary: Delete a user premium transaction by ID
   *     tags: [UserPremiumTransactions]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: The transaction ID
   *     responses:
   *       200:
   *         description: User premium transaction deleted successfully
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
   *                   example: "User premium transaction deleted successfully"
   *                 data:
   *                   type: object
   *                   properties:
   *                     transaction_id:
   *                       type: integer
   *                       example: 1
   */
  const deleteUserPremiumTransaction = async (req, res) => {
    const transactionId = req.params.id;
    try {
      const results = await deleteById(transactionId);
      return res.status(200).json({
        success: 1,
        message: "User premium transaction deleted successfully",
        data: results
      });
    } catch (err) {
      return res.status(500).json({
        success: 0,
        message: "Error: " + err.message
      });
    }
  };
  
  module.exports = {
    createUserPremiumTransaction,
    getAllUserPremiumTransactions,
    getUserPremiumTransactionById,
    updateUserPremiumTransactionDetails,
    deleteUserPremiumTransaction,
  };