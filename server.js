const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors')

const app = express();
const port = 3000;

app.use(cors({
    origin: '*' // Mengizinkan akses dari semua domain
}));

// Koneksi ke database
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'teknik23',
    port: 5432,
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint untuk menyimpan data
app.post('/submit-contact', async (req, res) => {
    const { nama, email, pesan } = req.body;

    try {
        await pool.query(
            'INSERT INTO kontak (nama, email, pesan) VALUES ($1, $2, $3)',
            [nama, email, pesan]
        );
        res.status(200).send('Pesan berhasil disimpan!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Terjadi kesalahan.');
    }
});

// Menjalankan server
app.listen(port, () => {
    console.log('Server berjalan di http://localhost:${port}');
});
