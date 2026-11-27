const pool = require('../config/db');

class KategoriRepository {

    // Mengambil semua kategori
    async findAll() {
        const result = await pool.query(
            'SELECT * FROM kategori ORDER BY id ASC'
        );

        return result.rows;
    }

    // Mengambil satu kategori berdasarkan ID
    async findById(id) {
        const result = await pool.query(
            'SELECT * FROM kategori WHERE id = $1',
            [id]
        );

        return result.rows[0];
    }

    // Menambahkan kategori baru
    async create(data) {
        const result = await pool.query(
            `INSERT INTO kategori (nama_kategori, deskripsi)
             VALUES ($1, $2)
             RETURNING *`,
            [data.nama_kategori, data.deskripsi || null]
        );

        return result.rows[0];
    }

    // Menghapus kategori secara permanen
    async delete(id) {
        const result = await pool.query(
            'DELETE FROM kategori WHERE id = $1 RETURNING *',
            [id]
        );

        return result.rows[0];
    }
}

// Membuat satu instance repository
module.exports = new KategoriRepository();