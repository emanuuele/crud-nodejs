const execSQLQuery = require('../dao')

const express = require('express')

const router = express.Router()

router.get('/users', (req, res, next) => {
    execSQLQuery('SELECT * FROM Users', res);
})
router.get('/users/:id?', (req, res, next) => {
    let filter = ''
    if (req.params.id) filter = ' WHERE ID= ' + parseInt(req.params.id)
    execSQLQuery('SELECT * FROM Users' + filter, res);
})
router.post('/users', (req, res, next) => {
    const name = req.body.name.substring(0, 150)
    const avatar = req.body.avatar.substring(0, 150)
    const city = req.body.city.substring(0, 150)
    execSQLQuery(`INSERT INTO Users(name, avatar, city) VALUES("${name}", "${avatar}", "${city}")`, res)
})
router.put('/users/:id?', (req, res, next)=>{
    const id = parseInt(req.params.id);
        const name = req.body.name.substring(0, 150)
        const avatar = req.body.avatar.substring(0, 150)
        const city = req.body.city.substring(0, 150)
        execSQLQuery(`UPDATE Users SET name ="${name}", avatar="${avatar}", city="${city}" WHERE ID = ${id}`, res)
})
router.delete('/users/:id?', (req, res, next) =>{
    execSQLQuery('DELETE FROM Users WHERE ID=' + parseInt(req.params.id), res)
})
module.exports = router