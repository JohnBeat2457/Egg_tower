const express = require('express');
const app = express();


app.use(express.static('site'));
app.use(express.json());

const fs = require('fs');

app.post('/save-name', (req, res) => {
    const name = req.body.name;
    fs.appendFile('/site/name.txt', name + '\n', err => {
        if (err) throw err;
        console.log('Name saved:', name);
    });
    res.send({ status: 'OK' });
});

app.get('/get-names', (req, res) => {
    fs.readFile('/site/name.txt', 'utf8', (err, data) => {
        if (err) throw err;
        res.send(data.split('\n').filter(name => name !== ''));
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

// ffd

function saveName() {
    var name = document.getElementById('nameInput').value;
    fetch('https://eggtower2noge.netlify.app/save-name', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name }),
    })
    .then(response => response.json())
    .then(data => console.log(data));
}

// dsvf

fetch('https://eggtower2noge.netlify.app/get-names')
    .then(response => response.json())
    .then(data => {
        data.forEach(name => {
            // Affichez chaque nom dans une liste sur votre site web
            console.log(name);
        });
    });
