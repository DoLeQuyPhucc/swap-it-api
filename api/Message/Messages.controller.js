const { create, getAll, getById, update, deleteById } = require('./Messages.service');

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Message management
 */

/**
 * @swagger
 * /api/v1/messages:
 *   post:
 *     summary: Create a new message
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 description: The ID of the user sending the message
 *                 example: 1
 *               receiver_id:
 *                 type: integer
 *                 description: The ID of the user receiving the message
 *                 example: 2
 *               message:
 *                 type: string
 *                 description: The message content
 *                 example: "Hello, how are you?"
 *     responses:
 *       200:
 *         description: Message created successfully
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
 *                   example: "Message created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 */
const createMessage = async (req, res) => {
    const body = req.body;
    try {
        const results = await create(body);
        return res.status(200).json({
            success: 1,
            message: "Message created successfully",
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
 * /api/v1/messages:
 *   get:
 *     summary: Retrieve a list of messages
 *     tags: [Messages]
 *     responses:
 *       200:
 *         description: A list of messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The message ID
 *                     example: 1
 *                   user_id:
 *                     type: integer
 *                     description: The ID of the user sending the message
 *                     example: 1
 *                   receiver_id:
 *                     type: integer
 *                     description: The ID of the user receiving the message
 *                     example: 2
 *                   message:
 *                     type: string
 *                     description: The message content
 *                     example: "Hello, how are you?"
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp of the message
 *                     example: "2023-10-01T12:00:00Z"
 */
const getAllMessages = async (req, res) => {
    try {
        const results = await getAll();
        return res.status(200).json({
            success: 1,
            message: "Messages retrieved successfully",
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
 * /api/v1/messages/{id}:
 *   get:
 *     summary: Retrieve a message by ID
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The message ID
 *     responses:
 *       200:
 *         description: Message retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The message ID
 *                   example: 1
 *                 user_id:
 *                   type: integer
 *                   description: The ID of the user sending the message
 *                   example: 1
 *                 receiver_id:
 *                   type: integer
 *                   description: The ID of the user receiving the message
 *                   example: 2
 *                 message:
 *                   type: string
 *                   description: The message content
 *                   example: "Hello, how are you?"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   description: The timestamp of the message
 *                   example: "2023-10-01T12:00:00Z"
 */
const getMessageById = async (req, res) => {
    const messageId = req.params.id;
    try {
        const results = await getById(messageId);
        return res.status(200).json({
            success: 1,
            message: "Message retrieved successfully",
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
 * /api/v1/messages/{id}:
 *   put:
 *     summary: Update message details
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The message ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: The message content
 *                 example: "Updated message content"
 *     responses:
 *       200:
 *         description: Message updated successfully
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
 *                   example: "Updated message successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 */
const updateMessageDetails = async (req, res) => {
    const body = req.body;
    const messageId = req.params.id;
    try {
        const results = await update(body, messageId);
        return res.status(200).json({
            success: 1,
            message: "Updated message successfully",
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
 * /api/v1/messages/{id}:
 *   delete:
 *     summary: Delete a message by ID
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The message ID
 *     responses:
 *       200:
 *         description: Message deleted successfully
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
 *                   example: "Message deleted successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 */
const deleteMessage = async (req, res) => {
    const messageId = req.params.id;
    try {
        const results = await deleteById(messageId);
        return res.status(200).json({
            success: 1,
            message: "Message deleted successfully",
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
    createMessage,
    getAllMessages,
    getMessageById,
    updateMessageDetails,
    deleteMessage
};