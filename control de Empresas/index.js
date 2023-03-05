'use strcit';

const express = require('express');
const app = express();
const {connection} = require('./src/database/conection');
require('dotenv').config();
const port = process.env.PORT;

const routesC = require('./src/routes/company.routes');

connection();


app.use(express.urlencoded({extended: false}));
app.use(express.json());

//companyDefault();
app.use('/api', routesC);


app.listen(port, ()=>{
    console.log(`El servidor esta corriendo en el puerto ${port}`);
})