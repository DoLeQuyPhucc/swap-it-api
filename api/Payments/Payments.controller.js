const { create, getAll, getById, update, deleteById } = require('./Payments.service');

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
 *                   properties:
 *                     payment_id:
 *                       type: integer
 *                       example: 1
 */
const createPayment = async (req, res) => {
    const body = req.body;
    try {
        const results = await create(body);
        return res.status(200).json({
            success: 1,
            message: "Payment created successfully",
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
 * /api/v1/payments:
 *   get:
 *     summary: Retrieve a list of payments
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
 *                   payment_id:
 *                     type: integer
 *                     description: The payment ID
 *                     example: 1
 *                   transaction_id:
 *                     type: integer
 *                     description: The ID of the transaction
 *                     example: 1
 *                   payment_method:
 *                     type: string
 *                     description: The payment method
 *                     example: "Credit Card"
 *                   amount:
 *                     type: number
 *                     format: float
 *                     description: The amount paid
 *                     example: 99.99
 *                   payment_status:
 *                     type: string
 *                     description: The status of the payment
 *                     example: "Completed"
 */
const getAllPayments = async (req, res) => {
    try {
        const results = await getAll();
        return res.status(200).json({
            success: 1,
            message: "Payments retrieved successfully",
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
 * /api/v1/payments/{id}:
 *   get:
 *     summary: Retrieve a payment by ID
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The payment ID
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
 *                   description: The payment ID
 *                   example: 1
 *                 transaction_id:
 *                   type: integer
 *                   description: The ID of the transaction
 *                   example: 1
 *                 payment_method:
 *                   type: string
 *                   description: The payment method
 *                   example: "Credit Card"
 *                 amount:
 *                   type: number
 *                   format: float
 *                   description: The amount paid
 *                   example: 99.99
 *                 payment_status:
 *                   type: string
 *                   description: The status of the payment
 *                   example: "Completed"
 */
const getPaymentById = async (req, res) => {
    const paymentId = req.params.id;
    try {
        const results = await getById(paymentId);
        return res.status(200).json({
            success: 1,
            message: "Payment retrieved successfully",
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
 * /api/v1/payments/{id}:
 *   put:
 *     summary: Update payment details
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The payment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
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
 *                   example: "Updated payment successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     payment_id:
 *                       type: integer
 *                       example: 1
 */
const updatePaymentDetails = async (req, res) => {
    const body = req.body;
    const paymentId = req.params.id;
    try {
        const results = await update(body, paymentId);
        return res.status(200).json({
            success: 1,
            message: "Updated payment successfully",
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
 *         description: The payment ID
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
 *                 data:
 *                   type: object
 *                   properties:
 *                     payment_id:
 *                       type: integer
 *                       example: 1
 */
const deletePayment = async (req, res) => {
    const paymentId = req.params.id;
    try {
        const results = await deleteById(paymentId);
        return res.status(200).json({
            success: 1,
            message: "Payment deleted successfully",
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
    createPayment,
    getAllPayments,
    getPaymentById,
    updatePaymentDetails,
    deletePayment
};