const { getUser, getUserByEmail } = require("../Users/Users.service");
const PaymentsService = require("./Payments.service");

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment management
 */

/**
 * @swagger
 * /api/v1/payments:
 *   post:
 *     summary: Create a new payment
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               payment_id:
 *                 type: integer
 *                 description: The ID of the payment
 *                 example: 1
 *               payment_method:
 *                 type: string
 *                 description: The payment method
 *                 example: "Credit Card"
 *               amount:
 *                 type: number
 *                 format: float
 *                 description: The amount paid
 *                 example: 99.99
 *               payment_status:
 *                 type: string
 *                 description: The status of the payment
 *                 example: "Completed"
 *               user_id:
 *                 type: integer
 *                 description: The ID of the user
 *                 example: 1
 *     responses:
 *       200:
 *         description: Payment created successfully
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
 *                   example: "Payment created successfully"
 *                 data:
 *                   type: object
 *       500:
 *         description: Error creating payment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: integer
 *                   example: 0
 *                 message:
 *                   type: string
 *                   example: "Error: <error message>"
 */
const createPayment = async (req, res) => {
  try {
    const data = req.body;
    const result = await PaymentsService.create(data);
    res.status(200).json({
      success: 1,
      message: "Payment created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: 0,
      message: "Error: " + error.message,
    });
  }
};

/**
 * @swagger
 * /api/v1/payments:
 *   get:
 *     summary: Get all payments
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: A list of payments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *
 *                   payment_method:
 *                     type: string
 *                     example: "Credit Card"
 *                   amount:
 *                     type: number
 *                     example: 99.99
 *                   payment_status:
 *                     type: string
 *                     example: "Completed"
 *                   user_id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "John Doe"
 *                   email:
 *                     type: string
 *                     example: "johndoe@example.com"
 *       500:
 *         description: Error retrieving payments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: integer
 *                   example: 0
 *                 message:
 *                   type: string
 *                   example: "Error: <error message>"
 */
const getAllPayments = async (req, res) => {
  try {
    const results = await PaymentsService.getAll();

    const data = await Promise.all(
      results.map(async (result) => {
        const user = await getUserByEmail(result.email);
        return {
          ...result,
          user: user[0],
        };
      })
    );

    res.status(200).json({
      success: 1,
      message: "Payments retrieved successfully",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: 0,
      message: "Error: " + error.message,
    });
  }
};

/**
 * @swagger
 * /api/v1/payments/{id}:
 *   put:
 *     summary: Update a payment
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the payment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               transaction_id:
 *                 type: integer
 *                 description: The ID of the transaction
 *                 example: 1
 *               payment_method:
 *                 type: string
 *                 description: The payment method
 *                 example: "Credit Card"
 *               amount:
 *                 type: number
 *                 format: float
 *                 description: The amount paid
 *                 example: 99.99
 *               payment_status:
 *                 type: string
 *                 description: The status of the payment
 *                 example: "Completed"
 *     responses:
 *       200:
 *         description: Payment updated successfully
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
 *                   example: "Payment updated successfully"
 *                 data:
 *                   type: object
 *       500:
 *         description: Error updating payment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: integer
 *                   example: 0
 *                 message:
 *                   type: string
 *                   example: "Error: <error message>"
 */
const updatePayment = async (req, res) => {
  try {
    const data = req.body;
    const paymentId = req.params.id;
    const result = await PaymentsService.update(data, paymentId);
    res.status(200).json({
      success: 1,
      message: "Payment updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: 0,
      message: "Error: " + error.message,
    });
  }
};

/**
 * @swagger
 * /api/v1/payments/{id}:
 *   get:
 *     summary: Get a payment by ID
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the payment
 *     responses:
 *       200:
 *         description: Payment retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 payment_id:
 *                   type: integer
 *                   example: 1
 *                 payment_method:
 *                   type: string
 *                   example: "Credit Card"
 *                 amount:
 *                   type: number
 *                   example: 99.99
 *                 payment_status:
 *                   type: string
 *                   example: "Completed"
 *                 user_id:
 *                   type: integer
 *                   example: 1
 *       500:
 *         description: Error retrieving payment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: integer
 *                   example: 0
 *                 message:
 *                   type: string
 *                   example: "Error: <error message>"
 */
const getPaymentById = async (req, res) => {
  try {
    const paymentId = req.params.id;
    const result = await PaymentsService.getById(paymentId);
    res.status(200).json({
      success: 1,
      message: "Payment retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: 0,
      message: "Error: " + error.message,
    });
  }
};

/**
 * @swagger
 * /api/v1/payments/{id}:
 *   delete:
 *     summary: Delete a payment by ID
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the payment
 *     responses:
 *       200:
 *         description: Payment deleted successfully
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
 *                   example: "Payment deleted successfully"
 *       500:
 *         description: Error deleting payment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: integer
 *                   example: 0
 *                 message:
 *                   type: string
 *                   example: "Error: <error message>"
 */
const deletePaymentById = async (req, res) => {
  try {
    const paymentId = req.params.id;
    const result = await PaymentsService.deleteById(paymentId);
    res.status(200).json({
      success: 1,
      message: "Payment deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: 0,
      message: "Error: " + error.message,
    });
  }
};

module.exports = {
  createPayment,
  getAllPayments,
  updatePayment,
  getPaymentById,
  deletePaymentById,
};
