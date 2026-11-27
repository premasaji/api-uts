
function validatePatch(req, res, next) {
    const data = req.body || {};

    if (
        typeof data !== 'object' ||
        Array.isArray(data)
    ) {
        return res.status(400).json({
            success: false,
            message: 'Body harus berupa objek JSON'
        });
    }

    const allowedFields = [
        'kategori_id',
        'kode_produk',
        'nama_produk',
        'harga',
        'stok'
    ];

    const fields = Object.keys(data);

    if (fields.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'Minimal satu field harus diisi'
        });
    }

    const invalidField = fields.find(
        field => !allowedFields.includes(field)
    );

    if (invalidField) {
        return res.status(400).json({
            success: false,
            message: `Field ${invalidField} tidak dikenali`
        });
    }

    if (fields.includes('kategori_id') &&
        (!Number.isInteger(Number(data.kategori_id)) ||
        Number(data.kategori_id) < 1)) {
        return res.status(400).json({
            success: false,
            message: 'Kategori ID harus berupa bilangan bulat positif'
        });
    }

    if (fields.includes('kode_produk') &&
        (typeof data.kode_produk !== 'string' ||
        data.kode_produk.trim() === '' ||
        data.kode_produk.length > 20)) {
        return res.status(400).json({
            success: false,
            message: 'Kode produk wajib diisi dan maksimal 20 karakter'
        });
    }

    if (fields.includes('nama_produk') &&
        (typeof data.nama_produk !== 'string' ||
        data.nama_produk.trim() === '' ||
        data.nama_produk.length > 100)) {
        return res.status(400).json({
            success: false,
            message: 'Nama produk wajib diisi dan maksimal 100 karakter'
        });
    }

    if (fields.includes('harga') &&
        (!Number.isInteger(Number(data.harga)) ||
        Number(data.harga) <= 0)) {
        return res.status(400).json({
            success: false,
            message: 'Harga harus berupa bilangan bulat lebih dari 0'
        });
    }

    if (fields.includes('stok') &&
        (!Number.isInteger(Number(data.stok)) ||
        Number(data.stok) < 0)) {
        return res.status(400).json({
            success: false,
            message: 'Stok harus berupa bilangan bulat minimal 0'
        });
    }

    next();
}

module.exports = validatePatch;
