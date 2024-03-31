const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.static('public')); // Pour servir les fichiers statiques

app.use(express.json());

app.post('/save-name', (req, res) => {
    const name = req.body.name;
    fs.appendFile('./site/name.txt', name + '\n', err => {
        if (err) throw err;
        console.log('Saved!');
    });
    res.send({ status: 'OK' });
});

app.get('/get-names', (req, res) => { // Nouvelle route GET
    fs.readFile('./site/name.txt', 'utf8', (err, data) => {
        if (err) throw err;
        res.send(data);
    });
});

app.listen(3000, () => console.log('Server started on port 3000'));
