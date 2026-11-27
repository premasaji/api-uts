const produkRepository = require('../repositories/produkRepository');

class ProdukController {
    // Menampilkan semua produk
    async getAll(req, res, next) {
        try {
            const kategoriId = req.query.kategori_id;
            
            // Memeriksa apakah kategori_id berupa angka positif
            if (
                kategoriId !== undefined &&
                (!/^[1-9]\d*$/.test(kategoriId))
            ) {
                return res.status(400).json({
                    success: false,
                    message: 'kategori_id harus berupa angka positif'
                });
            }

            const data = await produkRepository.findAll(
                kategoriId !== undefined ? Number(kategoriId) : null
            );

            return res.status(200).json({
                success: true,
                count: data.length,
                data
            });

        } catch (err) {
            next(err);
        }
    }
    async permanentDelete(req, res, next) {
    try {
        const produk = await produkRepository.findAnyById(req.params.id);

        if (!produk) {
            return res.status(404).json({
                success: false,
                message: 'Produk tidak ditemukan'
            });
        }

        if (produk.deleted_at === null) {
            return res.status(409).json({
                success: false,
                message: 'Produk masih aktif dan tidak dapat dihapus permanen'
            });
        }

        await produkRepository.permanentDelete(req.params.id);

        return res.status(204).send();

        } catch (err) {
            next(err);
        }
    }

    // Menampilkan detail produk
    async getById(req, res, next) {
        try {
            const data = await produkRepository.findById(req.params.id);

            if (!data) {
                return res.status(404).json({
                    success: false,
                    message: 'Produk tidak ditemukan'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Detail produk berhasil ditampilkan',
                data: data
            });
        } catch (err) {
            next(err);
        }
    }

    // Menampilkan produk berdasarkan kategori
    async getByKategori(req, res, next) {
        try {
            const data = await produkRepository.findByKategori(
                req.params.kategoriId
            );

            res.status(200).json({
                success: true,
                message: 'Data produk berdasarkan kategori berhasil ditampilkan',
                data: data
            });
        } catch (err) {
            next(err);
        }
    }

    // Menambahkan produk
    async create(req, res, next) {
        try {
            const data = await produkRepository.create(req.body);

            res.status(201).json({
                success: true,
                message: 'Produk berhasil ditambahkan',
                data: data
            });
        } catch (err) {
            if (err.code === '23505') {
                return res.status(422).json({
                    success: false,
                    message: 'Kode produk sudah digunakan'
                });
            }

            if (err.code === '23503') {
                return res.status(400).json({
                    success: false,
                    message: 'Kategori produk tidak ditemukan'
                });
            }

            next(err);
        }
    }

    // Mengubah data produk
    async update(req, res, next) {
        try {
            const data = await produkRepository.update(
                req.params.id,
                req.body
            );

            if (!data) {
                return res.status(404).json({
                    success: false,
                    message: 'Produk tidak ditemukan'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Produk berhasil diperbarui',
                data: data
            });
        } catch (err) {
            if (err.code === '23505') {
                return res.status(422).json({
                    success: false,
                    message: 'Kode produk sudah digunakan'
                });
            }

            if (err.code === '23503') {
                return res.status(400).json({
                    success: false,
                    message: 'Kategori produk tidak ditemukan'
                });
            }

            next(err);
        }
    }

    // Menghapus produk
    async delete(req, res, next) {
    try {
        const data = await produkRepository.softDelete(req.params.id);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: 'Produk tidak ditemukan'
            });
        }

        return res.status(204).send();

        } catch (err) {
        next(err);
        }
    }

    // Mengembalikan produk yang sudah dihapus
    async restore(req, res, next) {
        try {
            const data = await produkRepository.restore(req.params.id);

            if (!data) {
                return res.status(404).json({
                    success: false,
                    message: 'Produk tidak ditemukan atau belum dihapus'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Produk berhasil dikembalikan',
                data: data
            });
        } catch (err) {
            if (err.code === '23505') {
                return res.status(409).json({
                    success: false,
                    message: 'Kode produk sudah digunakan oleh produk lain'
                });
            }

            next(err);
        }
    }

    // Mengubah sebagian data produk
    async patch(req, res, next) {
        try {
            const data = await produkRepository.patch(
                req.params.id,
                req.body
            );

            if (!data) {
                return res.status(404).json({
                    success: false,
                    message: 'Produk tidak ditemukan'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Sebagian data produk berhasil diperbarui',
                data: data
            });
        } catch (err) {
            if (err.code === '23505') {
                return res.status(409).json({
                    success: false,
                    message: 'Kode produk sudah digunakan'
                });
            }

            if (err.code === '23503') {
                return res.status(422).json({
                    success: false,
                    message: 'Kategori produk tidak ditemukan'
                });
            }

            next(err);
        }
    }

}

module.exports = new ProdukController();