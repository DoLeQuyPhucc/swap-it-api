const pool = require("../../config/database");
const { DateTime } = require("luxon");

module.exports = {
  create: async (data) => {
    try {
      const postedDate = DateTime.fromFormat(
        data["posted-date"],
        "d/M/yyyy"
      ).toSQLDate();
      const [results] = await pool.query(
        `INSERT INTO Items (seller_id, item_name, description, price, category,
                 quantity, posted_date, item_status, image_Items) 
                VALUES( ?, ? ,?, ?, ?, ?, ?, ?, ?)`,

        [
          data.seller_id,
          data.item_name,
          data.description,
          data.price,
          data.category,
          data.quantity,
          postedDate,
          data.item_status,
          data.image_Items,
        ]
      );
      return results;
    } catch (error) {
      console.error("Error in create:", error);
      throw error;
    }
  },

  getAll: async () => {
    try {
      const query = `
        SELECT Items.*, Users.name AS user_name, Users.image_user 
        FROM Items 
        JOIN Users ON Items.seller_id = Users.user_id
      `;
      const [results] = await pool.query(query);
      return results;
    } catch (error) {
      console.error("Error in getAll:", error);
      throw error;
    }
  },

  updateItem: async (data, itemId) => {
    try {
      const postedDate = DateTime.fromFormat(
        data["posted-date"],
        "d/M/yyyy"
      ).toSQLDate();
      const [results] = await pool.query(
        `UPDATE Items SET seller_id = ?, item_name = ?, description = ?, price = ?, category = ?, quantity = ?, posted_date = ?, item_status = ?, image_Items = ? WHERE item_id = ?`,
        [
          data.seller_id,
          data.item_name,
          data.description,
          data.price,
          data.category,
          data.quantity,
          postedDate,
          data.item_status,
          data.image_Items,
          itemId,
        ]
      );
      return results;
    } catch (error) {
      console.error("Error in updateItem:", error);
      throw error;
    }
  },

  getItem: async (itemId) => {
    try {
      const query = `
        SELECT Items.*, Users.name AS user_name, Users.image_user 
        FROM Items 
        JOIN Users ON Items.seller_id = Users.user_id
        WHERE Items.item_id = ?
      `;
      const [results] = await pool.query(query, [itemId]);
      return results[0];
    } catch (error) {
      console.error("Error in getItem:", error);
      throw error;
    }
  },

  deleteItemById: async (itemId) => {
    try {
      const [results] = await pool.query(
        `DELETE FROM Items WHERE item_id = ?`,
        [itemId]
      );
      return results[0];
    } catch (error) {
      console.error("Error in deleteItemById:", error);
      throw error;
    }
  },

  searchItems: async (searchTerm) => {
    try {
      const query = `
                SELECT Items.*, Users.name AS user_name, Users.image_user 
                FROM Items 
                JOIN Users ON Items.seller_id = Users.user_id
                WHERE item_name LIKE ? 
                OR description LIKE ? 
                OR category LIKE ?
            `;
      const likeSearchTerm = `%${searchTerm}%`;
      const [results] = await pool.query(query, [
        likeSearchTerm,
        likeSearchTerm,
        likeSearchTerm,
      ]);
      return results;
    } catch (error) {
      console.error("Error in searchItems:", error);
      throw error;
    }
  },

  getItemsBySellerId: async (sellerId) => {
    try {
      const [results] = await pool.query(
        `SELECT Items.*, Users.name AS user_name, Users.image_user 
         FROM Items 
         JOIN Users ON Items.seller_id = Users.user_id 
         WHERE Items.seller_id = ?`,
        [sellerId]
      );
      return results;
    } catch (error) {
      console.error("Error in getItemsBySellerId:", error);
      throw error;
    }
  },
};
