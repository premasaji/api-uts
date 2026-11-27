const kategoriRepository = require('../repositories/kategoriRepository');

class KategoriController {

    // GET: Menampilkan semua kategori
    async getAll(req, res, next) {
        try {
            const data = await kategoriRepository.findAll();

            res.status(200).json({
                success: true,
                message: 'Data kategori berhasil ditampilkan',
                data: data
            });
        } catch (err) {
            next(err);
        }
    }

    // GET: Menampilkan kategori berdasarkan ID
    async getById(req, res, next) {
        try {
            const data = await kategoriRepository.findById(req.params.id);

            if (!data) {
                return res.status(404).json({
                    success: false,
                    message: 'Kategori tidak ditemukan'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Detail kategori berhasil ditampilkan',
                data: data
            });
        } catch (err) {
            next(err);
        }
    }

    // POST: Menambahkan kategori
    async create(req, res, next) {
        try {
            const data = await kategoriRepository.create(req.body);

            res.status(201).json({
                success: true,
                message: 'Kategori berhasil ditambahkan',
                data: data
            });
        } catch (err) {
            if (err.code === '23505') {
                return res.status(409).json({
                    success: false,
                    message: 'Nama kategori sudah digunakan'
                });
            }

            next(err);
        }
    }

    // DELETE: Menghapus kategori secara permanen
    async delete(req, res, next) {
        try {
            const data = await kategoriRepository.delete(req.params.id);

            if (!data) {
                return res.status(404).json({
                    success: false,
                    message: 'Kategori tidak ditemukan'
                });
            }

            res.status(204).send();
        } catch (err) {
            if (err.code === '23503') {
                return res.status(409).json({
                    success: false,
                    message: 'Kategori tidak dapat dihapus karena masih digunakan oleh produk'
                });
            }

            next(err);
        }
    }
}

module.exports = new KategoriController();