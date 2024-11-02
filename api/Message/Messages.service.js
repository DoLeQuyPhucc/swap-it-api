const pool = require('../../config/database');

module.exports = {
    create: async (data) => {
        try {
            const [results] = await pool.query(
                `INSERT INTO EXE202_giftfallto.Message (user_id, receiver_id, message, timestamp) VALUES (?, ?, ?, ?)`,
                [data.user_id, data.receiver_id, data.message, data.timestamp]
            );
            return results;
        } catch (error) {
            throw error;
        }
    },
    getAll: async () => {
        try {
            const [results] = await pool.query(`SELECT * FROM EXE202_giftfallto.Message`);
            return results;
        } catch (error) {
            throw error;
        }
    },
    update: async (data, messageId) => {
        try {
            const [results] = await pool.query(
                `UPDATE EXE202_giftfallto.EXE202_giftfallto.Message SET user_id = ?, receiver_id = ?, message = ?, timestamp = ? WHERE id = ?`,
                [data.user_id, data.receiver_id, data.message, data.timestamp, messageId]
            );
            return results;
        } catch (error) {
            throw error;
        }
    },
    getById: async (messageId) => {
        try {
            const [results] = await pool.query(`SELECT * FROM EXE202_giftfallto.Message WHERE id = ?`, [messageId]);
            return results[0];
        } catch (error) {
            throw error;
        }
    },
    deleteById: async (messageId) => {
        try {
            const [results] = await pool.query(`DELETE FROM EXE202_giftfallto.Message WHERE id = ?`, [messageId]);
            return results[0];
        } catch (error) {
            throw error;
        }
    }
};