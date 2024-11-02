const pool = require('../../config/database');

module.exports = {
    create: async (data) => {
        try {
            const [results] = await pool.query(
                `INSERT INTO EXE202_giftfallto.UserPremiumTransactions (user_id, package_id, purchase_date, expiry_date) VALUES (?, ?, ?, ?)`,
                [data.user_id, data.package_id, data.purchase_date, data.expiry_date]
            );
            return results;
        } catch (error) {
            throw error;
        }
    },
    getAll: async () => {
        try {
            const [results] = await pool.query(`SELECT * FROM EXE202_giftfallto.UserPremiumTransactions`);
            return results;
        } catch (error) {
            throw error;
        }
    },
    update: async (data, transactionId) => {
        try {
            const [results] = await pool.query(
                `UPDATE EXE202_giftfallto.UserPremiumTransactions SET user_id = ?, package_id = ?, purchase_date = ?, expiry_date = ? WHERE transaction_id = ?`,
                [data.user_id, data.package_id, data.purchase_date, data.expiry_date, transactionId]
            );
            return results;
        } catch (error) {
            throw error;
        }
    },
    getById: async (transactionId) => {
        try {
            const [results] = await pool.query(`SELECT * FROM EXE202_giftfallto.UserPremiumTransactions WHERE transaction_id = ?`, [transactionId]);
            return results[0];
        } catch (error) {
            throw error;
        }
    },
    deleteById: async (transactionId) => {
        try {
            const [results] = await pool.query(`DELETE FROM EXE202_giftfallto.UserPremiumTransactions WHERE transaction_id = ?`, [transactionId]);
            return results[0];
        } catch (error) {
            throw error;
        }
    }
};