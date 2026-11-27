function parseId(req, res, next) {
    const id = Number(req.params.id);

    // Memeriksa apakah ID berupa bilangan bulat positif
    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({
            success: false,
            message: 'ID harus berupa bilangan bulat positif'
        });
    }

    // Menyimpan ID yang sudah diperiksa
    req.params.id = id;

    next();
}

module.exports = parseId;