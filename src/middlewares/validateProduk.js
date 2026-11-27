function validateProduk(req, res, next) {
    const {
        kategori_id,
        kode_produk,
        nama_produk,
        harga,
        stok
    } = req.body;

    if (
        kategori_id === undefined ||
        !Number.isInteger(Number(kategori_id)) ||
        Number(kategori_id) < 1
    ) {
        return res.status(400).json({
            success: false,
            message: 'Kategori produk harus berupa ID bilangan bulat positif'
        });
    }

    if (
        typeof kode_produk !== 'string' ||
        kode_produk.trim() === '' ||
        kode_produk.trim().length > 20
    ) {
        return res.status(400).json({
            success: false,
            message: 'Kode produk wajib diisi dan maksimal 20 karakter'
        });
    }

    if (
        typeof nama_produk !== 'string' ||
        nama_produk.trim() === '' ||
        nama_produk.trim().length > 100
    ) {
        return res.status(400).json({
            success: false,
            message: 'Nama produk wajib diisi dan maksimal 100 karakter'
        });
    }

    if (
        harga === undefined ||
        !Number.isInteger(Number(harga)) ||
        Number(harga) <= 0
    ) {
        return res.status(400).json({
            success: false,
            message: 'Harga harus berupa bilangan bulat lebih dari 0'
        });
    }

    if (
        stok === undefined ||
        !Number.isInteger(Number(stok)) ||
        Number(stok) < 0
    ) {
        return res.status(400).json({
            success: false,
            message: 'Stok harus berupa bilangan bulat minimal 0'
        });
    }

    next();
}

module.exports = validateProduk;