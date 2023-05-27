const mysql = require('../database/database');

const show_student= (req, res)=>{
    mysql.query("SELECT * FROM student",(err, results )=>{
        if (err) throw err 
        console.log(results)
        res.send(results)
    })
}

module.exports = show_student