const { create, getAll, getById, update, deleteById,} = require('./PremiumPackages.service');
  
  /**
   * @swagger
   * tags:
   *   name: PremiumPackages
   *   description: Premium package management
   */
  
  /**
   * @swagger
   * /api/v1/premium-packages:
   *   post:
   *     summary: Create a new premium package
   *     tags: [PremiumPackages]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               package_name:
   *                 type: string
   *                 description: The name of the premium package
   *                 example: "Gold Package"
   *               duration_days:
   *                 type: integer
   *                 description: The duration of the premium package in days
   *                 example: 30
   *               price:
   *                 type: number
   *                 format: float
   *                 description: The price of the premium package
   *                 example: 49.99
   *     responses:
   *       200:
   *         description: Premium package created successfully
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
   *                   example: "Premium package created successfully"
   *                 data:
   *                   type: object
   *                   properties:
   *                     package_id:
   *                       type: integer
   *                       example: 1
   */
  const createPremiumPackage = async (req, res) => {
    const body = req.body;
    try {
      const results = await create(body);
      return res.status(200).json({
        success: 1,
        message: "Premium package created successfully",
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
   * /api/v1/premium-packages:
   *   get:
   *     summary: Retrieve a list of premium packages
   *     tags: [PremiumPackages]
   *     responses:
   *       200:
   *         description: A list of premium packages
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   package_id:
   *                     type: integer
   *                     description: The package ID
   *                     example: 1
   *                   package_name:
   *                     type: string
   *                     description: The name of the premium package
   *                     example: "Gold Package"
   *                   duration_days:
   *                     type: integer
   *                     description: The duration of the premium package in days
   *                     example: 30
   *                   price:
   *                     type: number
   *                     format: float
   *                     description: The price of the premium package
   *                     example: 49.99
   */
  const getAllPremiumPackages = async (req, res) => {
    try {
      const results = await getAll();
      return res.status(200).json({
        success: 1,
        message: "Premium packages retrieved successfully",
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
   * /api/v1/premium-packages/{id}:
   *   get:
   *     summary: Retrieve a premium package by ID
   *     tags: [PremiumPackages]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: The package ID
   *     responses:
   *       200:
   *         description: Premium package retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 package_id:
   *                   type: integer
   *                   description: The package ID
   *                   example: 1
   *                 package_name:
   *                   type: string
   *                   description: The name of the premium package
   *                   example: "Gold Package"
   *                 duration_days:
   *                   type: integer
   *                   description: The duration of the premium package in days
   *                   example: 30
   *                 price:
   *                   type: number
   *                   format: float
   *                   description: The price of the premium package
   *                   example: 49.99
   */
  const getPremiumPackageById = async (req, res) => {
    const packageId = req.params.id;
    try {
      const results = await getById(packageId);
      return res.status(200).json({
        success: 1,
        message: "Premium package retrieved successfully",
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
   * /api/v1/premium-packages/{id}:
   *   put:
   *     summary: Update premium package details
   *     tags: [PremiumPackages]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: The package ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               package_name:
   *                 type: string
   *                 description: The name of the premium package
   *                 example: "Gold Package"
   *               duration_days:
   *                 type: integer
   *                 description: The duration of the premium package in days
   *                 example: 30
   *               price:
   *                 type: number
   *                 format: float
   *                 description: The price of the premium package
   *                 example: 49.99
   *     responses:
   *       200:
   *         description: Premium package updated successfully
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
   *                   example: "Updated premium package successfully"
   *                 data:
   *                   type: object
   *                   properties:
   *                     package_id:
   *                       type: integer
   *                       example: 1
   */
  const updatePremiumPackageDetails = async (req, res) => {
    const body = req.body;
    const packageId = req.params.id;
    try {
      const results = await update(body, packageId);
      return res.status(200).json({
        success: 1,
        message: "Updated premium package successfully",
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
   * /api/v1/premium-packages/{id}:
   *   delete:
   *     summary: Delete a premium package by ID
   *     tags: [PremiumPackages]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: The package ID
   *     responses:
   *       200:
   *         description: Premium package deleted successfully
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
   *                   example: "Premium package deleted successfully"
   *                 data:
   *                   type: object
   *                   properties:
   *                     package_id:
   *                       type: integer
   *                       example: 1
   */
  const deletePremiumPackage = async (req, res) => {
    const packageId = req.params.id;
    try {
      const results = await deleteById(packageId);
      return res.status(200).json({
        success: 1,
        message: "Premium package deleted successfully",
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
    createPremiumPackage,
    getAllPremiumPackages,
    getPremiumPackageById,
    updatePremiumPackageDetails,
    deletePremiumPackage,
  };