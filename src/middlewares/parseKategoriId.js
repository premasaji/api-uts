function parseKategoriId(req, res, next) {
    const kategoriId = Number(req.params.kategoriId);

    if (!Number.isInteger(kategoriId) || kategoriId < 1) {
        return res.status(400).json({
            success: false,
            message: 'ID kategori harus berupa bilangan bulat positif'
        });
    }

    req.params.kategoriId = kategoriId;
    next();
}

module.exports = parseKategoriId;