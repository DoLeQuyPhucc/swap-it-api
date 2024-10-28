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
          "Pending",
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

  update: async (data, transactionId, status) => {
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
          status,
          transactionId,
        ]
      );

      if (status === "Completed") {
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
  acceptTransaction: async (transactionId) => {
    try {
      const [results] = await pool.query(
        `UPDATE Transactions 
         SET transaction_status = 'Completed' 
         WHERE transaction_id =?`,
        [transactionId]
      );
      return results; // Return the result of the update
    } catch (error) {
      console.error("Error in acceptTransaction:", error);
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

  // Get list of transactions by buyer_id
  getByBuyerId: async (buyerId) => {
    try {
      const [results] = await pool.query(
        `SELECT * FROM Transactions WHERE buyer_id = ?`,
        [buyerId]
      );
      return results; // Return all transactions related to the buyer
    } catch (error) {
      console.error("Error in getByBuyerId:", error);
      throw error;
    }
  },

  // Get list of transactions by seller_id
  getBySellerId: async (sellerId) => {
    try {
      const [results] = await pool.query(
        `SELECT * FROM Transactions WHERE seller_id = ?`,
        [sellerId]
      );
      return results; // Return all transactions related to the seller
    } catch (error) {
      console.error("Error in getBySellerId:", error);
      throw error;
    }
  },
};
