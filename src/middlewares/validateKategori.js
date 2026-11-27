function validateKategori(req, res, next) {
    const { nama_kategori } = req.body;

    // Memeriksa apakah nama kategori tersedia
    if (
        typeof nama_kategori !== 'string' ||
        nama_kategori.trim() === ''
    ) {
        return res.status(400).json({
            success: false,
            message: 'Nama kategori wajib diisi dan tidak boleh kosong'
        });
    }

    // Memeriksa panjang nama kategori
    if (nama_kategori.trim().length > 50) {
        return res.status(400).json({
            success: false,
            message: 'Nama kategori maksimal 50 karakter'
        });
    }

    // Melanjutkan ke Controller
    next();
}

module.exports = validateKategori;