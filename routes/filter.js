const execSQLQuery = require('../dao')
const connection = require('../dbConnection')

const express = require('express')

const router = express.Router()


router.get('/filter/:param?', (req,res)=>{ 
    execSQLQuery(`SELECT name FROM Users where name like '%${req.params.param}%'`,res)
})

module.exports= router