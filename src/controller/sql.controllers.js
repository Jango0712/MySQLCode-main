const { query } = require("express");
const { pool } = require("../database");
const { log } = require("console");

const getAlum = async (req, res) =>
{
    try{
        let sql;
        if(req.query.id == null)
            sql = "SELECT * FROM alumnos"
        else
            sql = "SELECT * FROM alumnos WHERE idalumno=" +req.query.id;
        
            let [result] = await pool.query(sql);
        res.send(result)
    }
    catch(err){
        console.log(err);
    }
}

const getAlums = async (req, res) =>
{
    try{
        let sql = "SELECT * FROM alumnos";
        console.log(sql);

        let [result] = await pool.query(sql);
        res.send(result)
    }
    catch(err){
        console.log(err);
    }
}

const postAlum = async (req, res) =>
{
    try{
        console.log(req.body);
        let sql = "INSERT INTO alumnos (apellido1, apellido2, id_cursoalum, Start_Bootcamp) "+
                "VALUES (?,?,?,?)";
        let params = [req.body.apellido1, req.body.apellido2, req.body.id_cursoalum, req.body.Start_Bootcamp]
        console.log(sql, params);
        let [result] = await pool.query(sql, params);
        console.log(result);

        if(result.insertId)
            res.send(String(result.insertId));
        else
            res.send("-1");
    }
    catch(err){
        console.log(err);
    }
}

const putAlum = async (req, res) =>
{
    try{
        console.log(req.body);
        let params = [
                    req.body.apellido1,
                    req.body.apellido2,
                    req.body.id_cursoalum,
                    req.body.Start_Bootcamp,
                    req.body.idalumno]
        
        let sql =  
                "UPDATE alumnos SET apellido1 = COALESCE(?, apellido1) , " +
                "apellido2 = COALESCE(?, apellido2) , " +
                "id_cursoalum = COALESCE(?, id_cursoalum) , " +
                "Start_Bootcamp = COALESCE(?, Start_Bootcamp) WHERE idalumno = ? ";
        console.log(sql);
        let [result] = await pool.query(sql, params);
        res.send(result)
    }
    catch(err){
        console.log(err);
    }
}

const deleteAlum = async (req, res) =>
{
    try{
        console.log(req.body);
        let sql = "DELETE FROM alumnos WHERE idalumno = ?";
        console.log(sql);
        let [result] = await pool.query(sql,[req.body.idalumno]);
        res.send(result)
    }
    catch(err){
        console.log(err);
    }
}

module.exports = {getAlum,getAlums, postAlum, putAlum, deleteAlum};