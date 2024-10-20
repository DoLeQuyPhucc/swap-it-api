const pool = require('../../config/database');

module.exports = {
    create: async (data) => {
        try {
            const [results] = await pool.query(
                `INSERT INTO PremiumPackages (package_name, duration_days, price) VALUES (?, ?, ?)`,
                [data.package_name, data.duration_days, data.price]
            );
            return results;
        } catch (error) {
            throw error;
        }
    },
    getAll: async () => {
        try {
            const [results] = await pool.query(`SELECT * FROM PremiumPackages`);
            return results;
        } catch (error) {
            throw error;
        }
    },
    update: async (data, packageId) => {
        try {
            const [results] = await pool.query(
                `UPDATE PremiumPackages SET package_name = ?, duration_days = ?, price = ? WHERE package_id = ?`,
                [data.package_name, data.duration_days, data.price, packageId]
            );
            return results;
        } catch (error) {
            throw error;
        }
    },
    getById: async (packageId) => {
        try {
            const [results] = await pool.query(`SELECT * FROM PremiumPackages WHERE package_id = ?`, [packageId]);
            return results[0];
        } catch (error) {
            throw error;
        }
    },
    deleteById: async (packageId) => {
        try {
            const [results] = await pool.query(`DELETE FROM PremiumPackages WHERE package_id = ?`, [packageId]);
            return results[0];
        } catch (error) {
            throw error;
        }
    }
};