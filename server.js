const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.static('site'));

app.use(express.json());

app.post('/save-name', (req, res) => {
    const name = req.body.name;
    fs.appendFile('name.txt', name + '\n', err => {
        if (err) throw err;
        console.log('Saved!');
    });
    res.send({ status: 'OK' });
});

app.listen(3000, () => console.log('Server started on port 3000'));
