const express = require('express');
const fs = require('fs');
const app = express();
const mongoose = require('mongoose');

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


app.listen(3000, () => console.log('Server started on port 3000'));

