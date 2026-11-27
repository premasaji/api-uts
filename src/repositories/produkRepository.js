const pool = require('../config/db');

class ProdukRepository {
    // Mengambil semua produk yang masih aktif
    async findAll(kategoriId = null) {
        let query = `
            SELECT p.*, k.nama_kategori
            FROM produk p
            JOIN kategori k ON p.kategori_id = k.id
            WHERE p.deleted_at IS NULL`;

        const values = [];

        if (kategoriId !== null) {
            values.push(kategoriId);
            query += ` AND p.kategori_id = $1`;
        }

        query += ` ORDER BY p.id ASC`;

        const result = await pool.query(query, values);

        return result.rows;
    }

    // Mengambil produk berdasarkan ID
    async findById(id) {
        const result = await pool.query(`
            SELECT
                p.*,
                k.nama_kategori
            FROM produk p
            JOIN kategori k ON p.kategori_id = k.id
            WHERE p.id = $1
            AND p.deleted_at IS NULL
        `, [id]);

        return result.rows[0];
    }

    // Mengambil produk berdasarkan kategori
    async findByKategori(kategoriId) {
        const result = await pool.query(`
            SELECT *
            FROM produk
            WHERE kategori_id = $1
            AND deleted_at IS NULL
            ORDER BY id ASC
        `, [kategoriId]);

        return result.rows;
    }

    // Menambahkan produk baru
    async create(data) {
        const result = await pool.query(`
            INSERT INTO produk
                (kategori_id, kode_produk, nama_produk, harga, stok)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `, [
            data.kategori_id,
            data.kode_produk,
            data.nama_produk,
            data.harga,
            data.stok
        ]);

        return result.rows[0];
    }

    // Mengubah data produk
    async update(id, data) {
        const result = await pool.query(`
            UPDATE produk
            SET
                kategori_id = $1,
                kode_produk = $2,
                nama_produk = $3,
                harga = $4,
                stok = $5
            WHERE id = $6
            AND deleted_at IS NULL
            RETURNING *
        `, [
            data.kategori_id,
            data.kode_produk,
            data.nama_produk,
            data.harga,
            data.stok,
            id
        ]);

        return result.rows[0];
    }

    // Menghapus produk secara soft delete
    async softDelete(id) {
        const result = await pool.query(`
            UPDATE produk
            SET deleted_at = NOW()
            WHERE id = $1
            AND deleted_at IS NULL
            RETURNING *
        `, [id]);

        return result.rows[0];
    }

    // Mengembalikan produk yang sudah dihapus
    async restore(id) {
        const result = await pool.query(`
            UPDATE produk
            SET deleted_at = NULL
            WHERE id = $1
            AND deleted_at IS NOT NULL
            RETURNING *
        `, [id]);

        return result.rows[0];
    }


    // Mengubah sebagian data produk
    async patch(id, data) {
        const fields = {
            kategori_id: data.kategori_id,
            kode_produk: data.kode_produk,
            nama_produk: data.nama_produk,
            harga: data.harga,
            stok: data.stok
        };

        const updates = Object.entries(fields)
            .filter(([key, value]) => Object.hasOwn(data, key));

        const setClause = updates
            .map(([key], index) => `${key} = $${index + 1}`)
            .join(', ');

        const values = updates.map(([key]) => fields[key]);
        values.push(id);

        const result = await pool.query(`
            UPDATE produk
            SET ${setClause}
            WHERE id = $${values.length}
            AND deleted_at IS NULL
            RETURNING *
        `, values);

        return result.rows[0];
    }

    async findAnyById(id) {
        const result = await pool.query(
            'SELECT * FROM produk WHERE id = $1',
            [id]);

        return result.rows[0];
    }

    async permanentDelete(id) {
        const result = await pool.query(`
            DELETE FROM produk
            WHERE id = $1
            AND deleted_at IS NOT NULL
            RETURNING *
        `, [id]);

        return result.rows[0];
    }
}

module.exports = new ProdukRepository();