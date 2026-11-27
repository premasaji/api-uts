require('dotenv').config();

const app = require('./app');

// Menentukan port server
const PORT = process.env.PORT || 3000;

// Menjalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});