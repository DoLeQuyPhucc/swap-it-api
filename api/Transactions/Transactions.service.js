const pool = require('../../config/database');

module.exports = {
    create: async (data) => {
        try {
            const [results] = await pool.query(
                `INSERT INTO Transactions (buyer_id, seller_id, item_id, transaction_date, transaction_status, total_amount) VALUES (?, ?, ?, ?, ?, ?)`,
                [data.buyer_id, data.seller_id, data.item_id, data.transaction_date, data.transaction_status, data.total_amount]
            );
            return results;
        } catch (error) {
            throw error;
        }
    },
    getAll: async () => {
        try {
            const [results] = await pool.query(`SELECT * FROM Transactions`);
            return results;
        } catch (error) {
            throw error;
        }
    },
    update: async (data, transactionId) => {
        try {
            const [results] = await pool.query(
                `UPDATE Transactions SET buyer_id = ?, seller_id = ?, item_id = ?, transaction_date = ?, transaction_status = ?, total_amount = ? WHERE transaction_id = ?`,
                [data.buyer_id, data.seller_id, data.item_id, data.transaction_date, data.transaction_status, data.total_amount, transactionId]
            );
            return results;
        } catch (error) {
            throw error;
        }
    },
    getById: async (transactionId) => {
        try {
            const [results] = await pool.query(`SELECT * FROM Transactions WHERE transaction_id = ?`, [transactionId]);
            return results[0];
        } catch (error) {
            throw error;
        }
    },
    deleteById: async (transactionId) => {
        try {
            const [results] = await pool.query(`DELETE FROM Transactions WHERE transaction_id = ?`, [transactionId]);
            return results[0];
        } catch (error) {
            throw error;
        }
    }
};