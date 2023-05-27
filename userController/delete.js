const mysql = require('../database/database');


const delete_student = (req, res)=>{
    const id = req.params.id;
    mysql.query('DELETE FROM student WHERE id = ?', [id], (err, result) => {
      if (err) throw err;
      console.log(`Deleted ${result} row(s)`);
      res.send(`Student with ID ${id} has been deleted`);
    });

}
module.exports = delete_student