const { query } = require("express");
const { pool } = require("../database")


const getmedia = async (req, res) =>
{
    try{
        let sql;
        if(req.query.id == null)
            sql = "SELECT * FROM alumnos"
        else
            sql = "SELECT AVG(Nota) FROM notas WHERE id_estudiante =" +req.query.id;
        
            let [result] = await pool.query(sql);
        res.send(result)
    }
    catch(err){
        console.log(err);
    }
}

const getmediaalum = async (req, res )=>
{
    try
    { 
        let sql;
        if(req.query.id == null)
        {
            sql = "SELECT * FROM alumnos";
        }else{
            sql = "SELECT a.idalumno ,s.title FROM alumnos AS a INNER JOIN cursos AS c ON (a.id_cursoalum = c.idCursos) INNER JOIN subprof AS z ON ( c.idCursos = z.id_curso) INNER JOIN subjets AS s ON (z.idsubjets =  s.idsubjet) WHERE a.idalumno =" + req.query.id + " GROUP BY a.idalumno, s.title "
        }

        let [result] =  await pool.query(sql);

        res.send(result);
    }
    catch(err)
    {
        console.log(err);
    }
    
}

const getAll =  async (req,res) =>
{
    try 
    {
        let sql = "SELECT  a.apellido1 , a.apellido2 , s.title FROM alumnos AS a INNER JOIN cursos AS c ON (a.id_cursoalum = c.idCursos) INNER JOIN subprof AS z ON (c.idCursos = z.id_curso) INNER JOIN subjets AS s ON (z.idsubjets =  s.idsubjet)";
        console.log(sql);

        let [result] = await pool.query(sql)
        res.send(result)
    }
    catch(err)
    {
        console.log(err);
    }
}

const getTeacher = async (req , res ) =>
{
    try
    { 
        let sql;
        if(req.query.id == null)
        {
            sql = "SELECT * FROM alumnos";
        }else{
            sql = "SELECT s.idsubjet ,p.idprofe FROM subjets AS s INNER JOIN subprof AS z ON (s.idsubjet = z.idsubjets) INNER JOIN profesores AS p ON (z.idteacher =  p.idprofe) WHERE s.idsubjet = 2" + req.query.id
        }

        let [result] =  await pool.query(sql);

        res.send(result);
    }
    catch(err)
    {
        console.log(err);
    }
}

const getsubj = async (req , res) =>
{
    
    try 
    {
        let sql = "SELECT  p.nombre , p.apellido1, s.title FROM profesores AS p  INNER JOIN subprof AS z ON (p.idprofe = z.idsubjets) INNER JOIN subjets AS s ON (z.idsubjets =  s.idsubjet)";
        console.log(sql);

        let [result] = await pool.query(sql)
        res.send(result)
    }
    catch(err)
    {
        console.log(err);
    }
}

module.exports = {getmedia, getmediaalum, getAll, getTeacher, getsubj};