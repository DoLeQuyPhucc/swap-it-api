const PayOS = require("@payos/node");
require("dotenv").config()

const payOS = new PayOS(
  process.env.MY_PAYOS_CLIENT_ID,
  process.env.MY_PAYOS_API_KEY,
  process.env.MY_PAYOS_CHECKSUM_KEY
);


/**
 * @swagger
 * tags:
 *   name: PayOS
 *   description: PayOS management
 */

/**
 * @swagger
 * /payos/payment-links:
 *   post:
 *     tags: 
 *       - PayOS
 *     summary: Create a payment link
 *     description: Create a new payment link using PayOS.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderCode:
 *                 type: string
 *                 example: "123456"
 *               amount:
 *                 type: number
 *                 example: 1000
 *               description:
 *                 type: string
 *                 example: "Payment for order #1234"
 *               buyerName:
 *                 type: string
 *                 example: "John Doe"
 *               buyerEmail:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               buyerPhone:
 *                 type: string
 *                 example: "+1234567890"
 *               buyerAddress:
 *                 type: string
 *                 example: "123 Main St, Anytown, USA"
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Item 1"
 *                     quantity:
 *                       type: number
 *                       example: 2
 *                     price:
 *                       type: number
 *                       example: 500
 *               cancelUrl:
 *                 type: string
 *                 example: "https://example.com/cancel"
 *               returnUrl:
 *                 type: string
 *                 example: "https://example.com/return"
 *               signature:
 *                 type: string
 *                 example: "signature_string"
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
 *       500:
 *         description: Error creating item
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
const paymentLinkRes = async (req, res) => {
    const body = req.body;
    try {
      const paymentLink = await payOS.createPaymentLink(body);
      return res.status(200).json({
        success: 1,
        message: "Item created successfully",
        data: paymentLink
      });
    } catch (error) {
      if (error.message.includes("Cổng thanh toán không tồn tại hoặc đã tạm dừng")) {
        return res.status(400).json({
          success: 0,
          message: "The payment gateway does not exist or has been suspended, please choose another gateway."
        });
      }
      return res.status(500).json({
        success: 0,
        message: "Error:" + error.message
      });
    }
  };
  
  /**
   * @swagger
   * /payos/payment-links/{id}:
   *   get:
   *     tags: 
   *       - PayOS
   *     summary: Get payment link information
   *     description: Retrieve information about a specific payment link using its ID.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the payment link
   *     responses:
   *       200:
   *         description: Get payment successfully
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
   *                   example: "get payment successfully"
   *                 data:
   *                   type: object
   *       500:
   *         description: Error getting payment
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
  const paymentLink = async (req, res) => {
    const id = req.params.id;
    try {
      const paymentLink = await payOS.getPaymentLinkInformation(id);
      return res.status(200).json({
        success: 1,
        message: "get payment successfully",
        data: paymentLink
      });
    } catch (error) {
      return res.status(500).json({
        success: 0,
        message: "Error:" + error.message
      });
    }
  };
  
  /**
   * @swagger
   * /payos/payment-links/{id}:
   *   delete:
   *     tags: 
   *       - PayOS
   *     summary: Cancel a payment link
   *     description: Cancel a specific payment link using its ID.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the payment link
   *     responses:
   *       200:
   *         description: Payment cancelled successfully
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
   *                   example: "payment cancelled successfully"
   *                 data:
   *                   type: object
   *       500:
   *         description: Error cancelling payment
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
  const cancelledPaymentLink = async (req, res) => {
    const id = req.params.id;
    try {
      const paymentLink = await payOS.cancelPaymentLink(id);
      return res.status(200).json({
        success: 1,
        message: "payment cancelled successfully",
        data: paymentLink
      });
    } catch (error) { 
      return res.status(500).json({
        success: 0,
        message: "Error:" + error.message
      });
    }
  };
  
  module.exports = { paymentLinkRes, paymentLink, cancelledPaymentLink };