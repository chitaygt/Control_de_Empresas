"use strict"

const Company = require('../models/company.model');
const {generateJWT} = require('../helpers/create-jwt');
const bcrypt = require("bcrypt");

const createcompany = async(req, res) =>{
const {email, password} = req.body;

try {
    let company = await Company.findOne({email});
    if (company) {
      return res.status(400).send({ 
        message: "Ya hay una empresa con este email.",
        ok: false,
        company: company,
      });
    }
    company = new Company(req.body);
    const salto = bcrypt.genSaltSync();
    company.password = bcrypt.hashSync(password, salto);
    company = await company.save();
    //const token = await generateJWT(company.id);
    return res.status(200).send({
      message: `La empresa ${email} se creo correctamente.`,
      company, //token: token
    });
    
  } catch (error) {
    throw new Error(error);
  }
};

const readcompany = async(req, res) =>{
    try{
        const companys = await Company.find();
        if(!companys){
            res.status(404).send({message:"No hay empresas dispnibles"});
        }else{
            res.status(200).json({"Empresas encontradas":companys});        }
    }catch(error){
        throw new Error(error);
    }
};

const updatecompany = async(req, res) =>{
    try{
        const id = req.params.id
        const companyEdit = {...req.body}

        companyEdit.password = companyEdit.password
        ? bcrypt.hashSync(companyEdit.password, bcrypt.genSaltSync())
        : companyEdit.password;
        const companyComplete = await Company.findByIdAndUpdate(id, companyEdit, {new: true})
        if(companyComplete){
            return res.status(200).send({message: "Empresa actualizada correctamente", companyComplete});
        }else{
            res.status(404).send({message: 'Esta Empresa no existe en la base de datos, verificar parametros'})
        }
    }catch(err){
        throw new Error(err);
    }
};

const deletecompany = async(req, res) =>{
    try{
        const id = req.params.id;
        const result = await Company.findByIdAndDelete(id)     
        res.status(201).send({message: "Se elimino empresa", Company: result});
    }catch(err){
        throw new Error(err);
    }
};

const login = async (req, res) =>{
    const {email, password} = req.body;
    try{
        const company = await Company.findOne({email});
        if(!company){
            return res.status(400).send({ok: false, message: 'La empresa no existe'});
        }
        const validPassword = bcrypt.compareSync(
            password, company.password
        );
        if(!validPassword){
            return res.status(400).send({ok: false, message: 'Contraseña incorrecta'});
        }

        const token = await generateJWT(company.id, company.companylogin, company.email);
        res.json({
            ok:true, id:company.id, name:company.companylogin, email:company.email
        });
    }catch (err){
        throw Error(err);
    }
};

const agregarSucursal = async (req, res) =>{
    try{
        const id = req.params.id;
        const {name, municipios} = req.body;

        const companySucursal = await Company.findByIdAndUpdate(
            id,
            {
            
                $push:{
                    sucursales:{
                        name: name,
                        municipios: municipios,
                    },
                },
            },
            {new: true}
        );
        if (!companySucursal) {
            return res.status(404).send({message: "Sucursal no encontrada"});
        }

        return res.status(200).send({companySucursal});
    }catch(err){
        throw new Error(err);
    }
};

const eliminarSucursal = async (req, res) =>{
    const id = req.params.id;
    const {idSucursal} = req.body;
    try{
        const deletecompany = await company.updateOne(
            {id},
            {
                $pull: {company : {_id: idSucursal}},
            },
            {new: true, multi: false}
        );

        if(!deletecompany) {
            return res.status(400).send({message: "No existe esta sucursal"});
        }
        return res.status(200).send({deleteSucursal});
    }catch(err) {
        throw new Error(err);
    }
};

const editarSucursal = async (req, res) => {
    const id = req.params.id;
    const {idSucursal, name, municipios} = req.body;
    try{
        const updateSucursal = await Company.updateOne(
            {_id: id, "sucursal._id": idSucursal},
            {
                $set: {
                    "sucursal.$.nombre": name,
                    "sucursal.$.municipio": municipios,
                },
            },
            {new: true}
        );
        if (!updateSucursal){
            return res.status(404).send({message: "no existe esta sucursal"});           
        }
        return res.status(200).send({editarSucursal, message: "Se edito la sucursal"})
    }catch(error){
        
    }
};

module.exports = {createcompany, readcompany, updatecompany, deletecompany, login, 
                //Sucursal
                agregarSucursal, eliminarSucursal, editarSucursal};
