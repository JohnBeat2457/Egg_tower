const express = require('express');
const fs = require('fs');
const app = express();
const mongoose = require('mongoose');
const fetch = require('node-fetch');

mongoose.connect('mongodb+srv://nogebeat:<password>@cluster0.mjz3juq.mongodb.net/', {useNewUrlParser: true, useUnifiedTopology: true});
const Name = mongoose.model('Name', new mongoose.Schema({ name: String }));

app.use(express.static('public')); // Pour servir les fichiers statiques

app.use(express.json());

app.post('/save-name', async (req, res) => {
    const name = new Name({ name: req.body.name });
    await name.save();
    res.send({ status: 'OK' });
});

app.get('/get-names', async (req, res) => {
    const names = await Name.find();
    res.send(names);
});

app.post('/auth', async (req, res) => {
    const { token } = req.body;
    const response = await fetch('https://api.netlify.com/api/v1/me', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const user = await response.json();
    if (user.code === 200) {
        res.send({ status: 'OK', user });
    } else {
        res.send({ status: 'error', message: 'Authentication failed' });
    }
});

app.listen(3000, () => console.log('Server started on port 3000'));
