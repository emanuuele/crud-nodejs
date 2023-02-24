const express = require('express');
const app = express();
const port = 3000; //porta padrão
const mysql = require('mysql2');
const bodyParser = require('body-parser')
app.use(bodyParser.json({ limit: 819200 }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json())
app.get('/', (req, res) => res.json({ message: 'funcionando' }))
app.listen(port)

function execSQLQuery(sqlQry, res) {
    const connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: "exemplo"
    })
    connection.query(sqlQry, (error, result, fields) => {
        if (error)
            res.json(error)

        else
            res.json(result)

        connection.end()
        console.log("executou")
    })
}
function getUsers() {
    app.get("/users", (req, res) => {
        execSQLQuery('SELECT * FROM Users', res);
    })
}
function getUnicUser(){
    app.get("/users/:id?", (req, res) => {
        let filter = ''
        if (req.params.id) filter = ' WHERE ID= ' + parseInt(req.params.id)
        execSQLQuery('SELECT * FROM Users' + filter, res);
    })
}

function addUser() {
    app.post("/users", (req, res) => {
        const name = req.body.name.substring(0, 150)
        const avatar = req.body.avatar.substring(0, 150)
        const city = req.body.city.substring(0, 150)
        execSQLQuery(`INSERT INTO Users(name, avatar, city) VALUES("${name}", "${avatar}", "${city}")`, res)
    })
}
function updateUser() {
    app.put("/users/:id", (req, res) => {
        const id = parseInt(req.params.id);
        const name = req.body.name.substring(0, 150)
        const avatar = req.body.avatar.substring(0, 150)
        const city = req.body.city.substring(0, 150)
        execSQLQuery(`UPDATE Users SET name ="${name}", avatar="${avatar}", city="${city}" WHERE ID = ${id}`, res)
    })
}
function deleteUser() {
    app.delete("/users/:id", (req, res) => {
        execSQLQuery('DELETE FROM Users WHERE ID=' + parseInt(req.params.id), res);
    })
}
deleteUser()
addUser()
getUsers()
getUnicUser()
updateUser()