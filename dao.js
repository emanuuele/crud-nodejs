const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: "exemplo"
})

function execSQLQuery(sqlQry, res) {
    connection.query(sqlQry, (error, result, fields) => {
        if (error) res.json(error)
        else {
            console.log({ result })
            res.json(result)
        }

        connection.end()
        console.log("executou")
    })
}

module.exports = execSQLQuery, { connection }