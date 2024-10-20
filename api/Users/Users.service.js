const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../../config/database');

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = async (user) => {
  if (!user || !user.user_id || !user.name) {
    throw new Error('Invalid user payload');
  }
  const refreshToken = jwt.sign({ id: user.user_id, username: user.name }, process.env.REFRESH_TOKEN_SECRET);
  await db.query('INSERT INTO refresh_tokens (token, user_id) VALUES (?, ?)', [refreshToken, user.user_id]);
  return refreshToken;
};

const validateUser = async (email, password) => {
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      return false;
    }

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid ? user : false;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const refreshToken = async (token) => {
  try {
    const [rows] = await db.query('SELECT * FROM refresh_tokens WHERE token = ?', [token]);
    if (rows.length === 0) {
      return null;
    }

    const user = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = generateAccessToken({ id: user.id, username: user.username });
    return accessToken;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const revokeRefreshToken = async (token) => {
  await db.query('DELETE FROM refresh_tokens WHERE token = ?', [token]);
};

const registerUser = async (name, email, password, confirmPassword) => {
  try {
    if(password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);
    return { user_id: result.insertId, name, email };
  } catch (err) {
    console.error(err);
    throw new Error('User registration failed');
  }
};
const updateUser = async (user_id, name, is_premium, image_user, password) => {
  try {
    const updates = [];
    const values = [];

    if (name) {
      updates.push('name = ?');
      values.push(name);
    }
    if (is_premium !== undefined) {
      updates.push('is_premium = ?');
      values.push(is_premium);
    }
    if (image_user) {
      updates.push('image_user = ?');
      values.push(image_user);
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updates.push('password = ?');
      values.push(hashedPassword);
    }

    values.push(user_id);

    const query = `UPDATE users SET ${updates.join(', ')} WHERE user_id = ?`;
    await db.query(query, values);
    const user = await getUser(user_id);
    console.log(user);
    return user;
  } catch (err) {
    console.error(err);
    throw new Error('User update failed');
  }
};
const getUser = async (user_id) => {
  
  return await db.query('SELECT * FROM users WHERE user_id = ?', [user_id]);
}
module.exports = {
  generateAccessToken,
  generateRefreshToken,
  validateUser,
  refreshToken,
  revokeRefreshToken,
  registerUser,
  updateUser,
};