const pool = require('../../config/database');

module.exports = {
    create: async (data) => {
        try {
            const [results] = await pool.query(
                `INSERT INTO Payments (transaction_id, payment_method, amount, payment_status) VALUES (?, ?, ?, ?)`,
                [data.transaction_id, data.payment_method, data.amount, data.payment_status]
            );
            return results;
        } catch (error) {
            throw error;
        }
    },
    getAll: async () => {
        try {
            const [results] = await pool.query(`SELECT * FROM Payments`);
            return results;
        } catch (error) {
            throw error;
        }
    },
    update: async (data, paymentId) => {
        try {
            const [results] = await pool.query(
                `UPDATE Payments SET transaction_id = ?, payment_method = ?, amount = ?, payment_status = ? WHERE payment_id = ?`,
                [data.transaction_id, data.payment_method, data.amount, data.payment_status, paymentId]
            );
            return results;
        } catch (error) {
            throw error;
        }
    },
    getById: async (paymentId) => {
        try {
            const [results] = await pool.query(`SELECT * FROM Payments WHERE payment_id = ?`, [paymentId]);
            return results[0];
        } catch (error) {
            throw error;
        }
    },
    deleteById: async (paymentId) => {
        try {
            const [results] = await pool.query(`DELETE FROM Payments WHERE payment_id = ?`, [paymentId]);
            return results[0];
        } catch (error) {
            throw error;
        }
    }
};