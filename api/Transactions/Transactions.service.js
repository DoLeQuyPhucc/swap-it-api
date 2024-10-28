const pool = require("../../config/database");

module.exports = {
  create: async (data) => {
    try {
      const [results] = await pool.query(
        `INSERT INTO Transactions (buyer_id, seller_id, item_buyer_id, item_seller_id, transaction_date, transaction_status) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          data.buyer_id,
          data.seller_id,
          data.item_buyer_id,
          data.item_seller_id,
          data.transaction_date,
          data.transaction_status,
        ]
      );

      if (data.transaction_status === "Completed") {
        // Update the item statuses to "Sold"
        await pool.query(
          `UPDATE Items 
           SET item_status = 'Sold' 
           WHERE item_id IN (?, ?)`,
          [data.item_buyer_id, data.item_seller_id]
        );
      }

      return results;
    } catch (error) {
      console.error("Error in create:", error);
      throw error;
    }
  },

  getAll: async () => {
    try {
      const [results] = await pool.query(`SELECT * FROM Transactions`);
      return results;
    } catch (error) {
      console.error("Error in getAll:", error);
      throw error;
    }
  },

  update: async (data, transactionId) => {
    try {
      const [results] = await pool.query(
        `UPDATE Transactions 
         SET buyer_id = ?, seller_id = ?, item_buyer_id = ?, item_seller_id = ?, transaction_date = ?, transaction_status = ? 
         WHERE transaction_id = ?`,
        [
          data.buyer_id,
          data.seller_id,
          data.item_buyer_id,
          data.item_seller_id,
          data.transaction_date,
          data.transaction_status,
          transactionId,
        ]
      );

      if (data.transaction_status === "Completed") {
        // Update the item statuses to "Sold"
        await pool.query(
          `UPDATE Items 
           SET item_status = 'Sold' 
           WHERE item_id IN (?, ?)`,
          [data.item_buyer_id, data.item_seller_id]
        );
      }
      return results;
    } catch (error) {
      console.error("Error in update:", error);
      throw error;
    }
  },

  getById: async (transactionId) => {
    try {
      const [results] = await pool.query(
        `SELECT * FROM Transactions WHERE transaction_id = ?`,
        [transactionId]
      );
      return results[0]; // Return the first result if it exists
    } catch (error) {
      console.error("Error in getById:", error);
      throw error;
    }
  },

  deleteById: async (transactionId) => {
    try {
      const [results] = await pool.query(
        `DELETE FROM Transactions WHERE transaction_id = ?`,
        [transactionId]
      );
      return results; // Return the result of the deletion
    } catch (error) {
      console.error("Error in deleteById:", error);
      throw error;
    }
  },
};
