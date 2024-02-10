const express = require('express');
const app =  express();
const env = require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')))

app.use('/admin', require('./src/routes/admin.js'));
app.use('/common', require('./src/routes/common.js'));

app.listen(process.env.APP_PORT, (req, res) => {
    console.log('server is working', process.env.APP_PORT);

})