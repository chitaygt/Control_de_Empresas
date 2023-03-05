"use strict"

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Company = Schema({
    Name: {
        type: String,
        require: true,
    },

    email: {
        type: String,
        require: true,
    },

    password:{
        type: String,
        require: true,
    },

    tipoDeEmpresa: {
        type: String,
        require: true,
    },

    sucursales: [{
        name: String,
        municipios: String,
    }],
});

module.exports  = mongoose.model("Company", Company);



