const pool = require('../../config/database');

module.exports = {
    create: async (data) => {
        try {
            const [results] = await pool.query(
                `INSERT INTO EXE202_giftfallto.Payments ( payment_method, amount, payment_status,user_id) VALUES (?, ?, ?,?)`,
                [ data.payment_method, data.amount, data.payment_status, data.user_id]
            );
            return results;
        } catch (error) {
            throw error;
        }
    },
    getAll: async () => {
        try {
            const [results] = await pool.query(`SELECT EXE202_giftfallto.Payments.payment_id, EXE202_giftfallto.Payments.payment_method, EXE202_giftfallto.Payments.amount, EXE202_giftfallto.Payments.payment_status, EXE202_giftfallto.Users.name, EXE202_giftfallto.Users.email
                                                FROM EXE202_giftfallto.Payments
                                                JOIN EXE202_giftfallto.Users ON EXE202_giftfallto.Payments.user_id = EXE202_giftfallto.Users.user_id`);
            return results;
        } catch (error) {
            throw error;
        }
    },
    update: async (data, paymentId) => {
        try {
            const [results] = await pool.query(
                `UPDATE EXE202_giftfallto.Payments SET transaction_id = ?, payment_method = ?, amount = ?, payment_status = ? WHERE payment_id = ?`,
                [data.transaction_id, data.payment_method, data.amount, data.payment_status, paymentId]
            );
            return results;
        } catch (error) {
            throw error;
        }
    },
    getById: async (paymentId) => {
        try {
            const [results] = await pool.query(`SELECT * FROM EXE202_giftfallto.Payments WHERE payment_id = ?`, [paymentId]);
            return results[0];
        } catch (error) {
            throw error;
        }
    },
    deleteById: async (paymentId) => {
        try {
            const [results] = await pool.query(`DELETE FROM EXE202_giftfallto.Payments WHERE payment_id = ?`, [paymentId]);
            return results[0];
        } catch (error) {
            throw error;
        }
    }
};