//server 
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const { timeStamp } = require('console');
const { json } = require('body-parser');
const { stringify } = require('querystring');
const fs  = require('fs');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5011;


const DATA_FILE = './passwords.json';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/' , (req, res) => {
    res.render('landing');
});

app.get('/vault', (req, res) => {
    let data = [];
    if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        data = JSON.parse(raw);
    }
    res.render('index', { title: 'BlueVault', data });
});

app.get('/something', (req, res) => {
    res.render('something');
});

app.post('/submit', (req, res) => {
    let pw = req.body.password;
    if (pw === 'password'){
        console.log("yes");
        res.sendStatus(200);
    }
    else {
        res.sendStatus(401);
    }
});


app.post('/api/upload-pass', (req, res) => {
    const { auth_token, machine, username, new_password, changed_by } = req.body;

    

    if ( auth_token !== process.env.API_TOKEN ) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const entry = {
        machine,
        username,
        password: new_password,
        changed_by,
        timeStamp: new Date().toISOString()
    }

    let data = [];
    if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE);
        data = JSON.parse(raw);
    }

    data.push(entry);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');

    res.json({ status: 'success', message: 'Password uploaded.' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

process.on('exit', (code) => {
    console.log('Process exiting with code:', code);
});
