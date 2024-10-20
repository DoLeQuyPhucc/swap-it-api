const {
  generateAccessToken,
  generateRefreshToken,
  validateUser,
  refreshToken,
  revokeRefreshToken,
  registerUser,
  updateUser,
} = require('./Users.service');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: Login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: password123
 *     responses:
 *       200:
 *         description: Users with token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: The access token
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 refreshToken:
 *                   type: string
 *                   description: The refresh token
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Invalid email or password
 */
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await validateUser(email, password);
  if (user) {
    const accessToken = generateAccessToken({ id: user.user_id, username: user.name });
    const refreshToken = await generateRefreshToken({ user_id: user.user_id, name: user.name });
    res.json({ accessToken, refreshToken });
  } else {
    res.status(400).send('Invalid email or password');
  }
};

/**
 * @swagger
 * /api/v1/users/refresh-token:
 *   post:
 *     summary: Refresh Access Token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: The refresh token
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: New access token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: The new access token
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       403:
 *         description: Invalid refresh token
 */
const refreshTokenController = async (req, res) => {
  const { token } = req.body;
  const newAccessToken = await refreshToken(token);

  if (newAccessToken) {
    res.json({ accessToken: newAccessToken });
  } else {
    res.sendStatus(403);
  }
};

/**
 * @swagger
 * /api/v1/users/logout:
 *   post:
 *     summary: Logout
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: The refresh token
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       204:
 *         description: Successfully logged out
 */
const logout = async (req, res) => {
  const { token } = req.body;
  await revokeRefreshToken(token);
  res.sendStatus(204);
};

/**
 * @swagger
 * /api/v1/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: The user's email
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: password123
 *               confirmPassword:
 *                 type: string
 *                 description: The user's confirm password
 *                 example: password123
 * 
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: integer
 *                   description: The user ID
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: The user's name
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   description: The user's email
 *                   example: john.doe@example.com
 *       500:
 *         description: Internal server error
 */
const register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    const user = await registerUser(name, email, password, confirmPassword);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

/**
 * @swagger
 * /api/v1/users/update:
 *   put:
 *     summary: Update user details
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name
 *                 example: John Doe
 *               is_premium:
 *                 type: boolean
 *                 description: Whether the user is premium
 *                 example: true
 *               image_user:
 *                 type: string
 *                 description: The user's profile image URL
 *                 example: http://example.com/image.jpg
 *               password:
 *                 type: string
 *                 description: The user's new password
 *                 example: newpassword123
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: integer
 *                   description: The user ID
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: The user's name
 *                   example: John Doe
 *                 is_premium:
 *                   type: boolean
 *                   description: Whether the user is premium
 *                   example: true
 *                 image_user:
 *                   type: string
 *                   description: The user's profile image URL
 *                   example: http://example.com/image.jpg
 *       500:
 *         description: Internal server error
 */
const update = async (req, res) => {
  const { name, is_premium, image_user, password } = req.body;
  const user_id = req.params.id;

  try {
    const user = await updateUser(user_id, name, is_premium, image_user, password);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { login, refreshTokenController, logout, register, update };