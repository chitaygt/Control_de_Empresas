"use strict"

const {Router} = require("express")
const { createcompany, readcompany, updatecompany, agregarSucursal, editarSucursal, login, deletecompany} = require('../controllers/Company.controllers');
const api = Router();
api.post('/cretae-company', createcompany);
api.get('/read-company', readcompany);
api.put('/update-company/:id', updatecompany);
api.delete('/delete-company/:id', deletecompany);

api.put('/create-sucursal/:id', agregarSucursal);
api.put('/editar-sucursal/:id', editarSucursal);
api.post('/create-login', login);
module.exports = api;

