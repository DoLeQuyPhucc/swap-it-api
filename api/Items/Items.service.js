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
        `INSERT INTO EXE202_giftfallto.Items (seller_id, item_name, description, price, category_id,
                 quantity, posted_date, address, item_status, image_Items) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          data.seller_id,
          data.item_name,
          data.description,
          data.price,
          data.category_id,
          data.quantity,
          postedDate,
          data.address,
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
        SELECT Items.*, Users.name AS user_name, Users.image_user, Categories.category_name
        FROM EXE202_giftfallto.Items 
        JOIN EXE202_giftfallto.Users ON Items.seller_id = Users.user_id
        LEFT JOIN Categories ON Items.category_id = Categories.category_id
        `;

      const query2 = `
      SELECT i.item_id, i.image_url
      FROM EXE202_giftfallto.Item_images i
      `;

      const [results] = await pool.query(query);

      const [results2] = await pool.query(query2);

      //push image url to result.item_images ([]) if item_id is the same
      results.forEach((item) => {
        item.item_images = [];
        results2.forEach((image) => {
          if (item.item_id === image.item_id) {
            item.item_images.push(image.image_url);
          }
        });
      });
      return results;
    } catch (error) {
      console.error("Error in getAll:", error);
      throw error;
    }
  },

  getItemByCategory: async (categoryId) => {
    try {
      const [results] = await pool.query(
        `SELECT * FROM EXE202_giftfallto.Items WHERE category_id = ?`,
        [categoryId]
      );
      return results;
    } catch (error) {
      console.error("Error in getItemByCategory:", error);
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
        `UPDATE EXE202_giftfallto.Items SET seller_id = ?, item_name = ?, description = ?, price = ?, 
                category_id = ?, quantity = ?, posted_date = ?, address = ?, 
                item_status = ?, image_Items = ? 
         WHERE item_id = ?`,
        [
          data.seller_id,
          data.item_name,
          data.description,
          data.price,
          data.category_id,
          data.quantity,
          postedDate,
          data.address,
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
        SELECT Items.*, Users.name AS user_name, Users.image_user, Categories.category_name 
        FROM EXE202_giftfallto.Items 
        JOIN EXE202_giftfallto.Users ON Items.seller_id = Users.user_id
        LEFT JOIN Categories ON Items.category_id = Categories.category_id
        WHERE Items.item_id = ?
      `;

      const query2 = `
      SELECT i.item_id, i.image_url
      FROM EXE202_giftfallto.Item_images i
      WHERE i.item_id = ?
      `;

      const [results2] = await pool.query(query2, [itemId]);
      const [results] = await pool.query(query, [itemId]);

      results[0].item_images = results2.map((image) => image.image_url);
      return results[0];
    } catch (error) {
      console.error("Error in getItem:", error);
      throw error;
    }
  },

  deleteItemById: async (itemId) => {
    try {
      const [results] = await pool.query(
        `DELETE FROM EXE202_giftfallto.Items WHERE item_id = ?`,
        [itemId]
      );
      return results;
    } catch (error) {
      console.error("Error in deleteItemById:", error);
      throw error;
    }
  },

  searchItems: async (searchTerm) => {
    try {
      const query = `
        SELECT Items.*, Users.name AS user_name, Users.image_user, Categories.category_name 
        FROM EXE202_giftfallto.Items 
        JOIN EXE202_giftfallto.Users ON Items.seller_id = Users.user_id
        LEFT JOIN EXE202_giftfallto.Categories ON Items.category_id = Categories.category_id
        WHERE item_name LIKE ? 
        OR description LIKE ? 
        OR Categories.category_name LIKE ?
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
        `SELECT Items.*, Users.name AS user_name, Users.image_user, Categories.category_name 
         FROM EXE202_giftfallto.Items 
         JOIN EXE202_giftfallto.Users ON Items.seller_id = Users.user_id
         LEFT JOIN Categories ON Items.category_id = Categories.category_id 
         WHERE Items.seller_id = ?`,
        [sellerId]
      );

      const query2 = `
      SELECT i.item_id, i.image_url
      FROM EXE202_giftfallto.Item_images i
      `;

      const [results2] = await pool.query(query2);

      //push image url to result.item_images ([]) if item_id is the same
      results.forEach((item) => {
        item.item_images = [];
        results2.forEach((image) => {
          if (item.item_id === image.item_id) {
            item.item_images.push(image.image_url);
          }
        });
      });

      console.log(sellerId);
      console.log(results);
      return results;
    } catch (error) {
      console.error("Error in getItemsBySellerId:", error);
      throw error;
    }
  },
};
