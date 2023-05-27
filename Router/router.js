const express = require('express')
let app = express.Router()
let registerUser = require('../userController/register')
let login = require("../userController/login")
let add_student = require("../userController/add_student")
let updateStudent= require("../userController/update")
let delete_student = require("../userController/delete")
let show_student = require("../userController/show_students")

app.get('/register',registerUser)
app.post('/login', login)
app.post('/addstudent', add_student)
app.put('/updatestudent/:id', updateStudent)
app.delete('/deletestudent/:id', delete_student)
app.get("/showall", show_student)



module.exports = app

