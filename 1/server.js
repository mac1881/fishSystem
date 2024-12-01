const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// MySQL bağlantısı kurma
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // MySQL şifrenizi buraya yazın
    database: 'admin_panel'
});

db.connect(err => {
    if (err) {
        console.error('MySQL bağlantı hatası:', err);
    } else {
        console.log('MySQL veritabanına başarıyla bağlanıldı');
    }
});

// Tüm kullanıcıları alma
app.get('/api/users', (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Yeni kullanıcı ekleme
app.post('/api/users', (req, res) => {
    const { ad, email } = req.body;
    const query = 'INSERT INTO users (ad, email) VALUES (?, ?)';
    db.query(query, [ad, email], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: result.insertId, ad, email });
    });
});

// Kullanıcı güncelleme
app.put('/api/users/:id', (req, res) => {
    const { ad, email } = req.body;
    const { id } = req.params;
    const query = 'UPDATE users SET ad = ?, email = ? WHERE id = ?';
    db.query(query, [ad, email, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id, ad, email });
    });
});

// Kullanıcı silme
app.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM users WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Kullanıcı silindi' });
    });
});

// Sunucuyu başlatma
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} üzerinde çalışıyor`);
});
function addUser() {
    const ad = document.getElementById('ad').value;
    const email = document.getElementById('email').value;

    fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ad, email })
    })
    .then(response => response.json())
    .then(user => {
        const userTableBody = document.getElementById('userTableBody');
        const newRow = userTableBody.insertRow();
        newRow.innerHTML = `
            <td>${user.id}</td>
            <td class="name">${user.ad}</td>
            <td class="email">${user.email}</td>
            <td>
                <button class="edit" onclick="editUser(this)">Düzenle</button>
                <button class="delete" onclick="deleteUser(this)">Sil</button>
            </td>
        `;
        resetForm();
    });
}