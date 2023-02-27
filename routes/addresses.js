const execSQLQuery = require('../dao')
const connection = require('../dbConnection')

const express = require('express')

const router = express.Router()

router.get('/addresses', (req, res, next) => {

    try {
        connection.query('SELECT DISTINCT city FROM Users', (error, result) => {
            if (error) res.json(error)

            else {
                res.json({ result: result.map((data) => { return data.city }) })
            }
        })
    } catch (error) {

    }
})
module.exports = router