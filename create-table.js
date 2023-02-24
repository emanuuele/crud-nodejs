const mysql = require('mysql2')
//criando um objeto connection para criar a conexão 
//com o mysql com os atributos bases para um banco: 
//host, porta, user, password, 
//e qual o banco de dados a ser conectado
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "exemplo"
})
//chamando a chave connect do objeto connection (padrão do mysql)

connection.connect((err) => {
    if (err) return console.log(err)
    createTable(connection)
    //passa connection (o objeto) como parametro na função createTable
})
function createTable(conn) {
    //recebe connection no parametro conn
    const sql = "CREATE TABLE IF NOT EXISTS Users(" +
        "id int NOT NULL AUTO_INCREMENT," + 
        "name varchar(150) NOT NULL," + 
        "avatar varchar(250) NOT NULL,"+
        "city varchar(50) NOT NULL, "+ 
        "PRIMARY KEY (id));"
    conn.query(sql, (error, results, fiels)=> {
        if (error) return console.log(error);
        addUsers(connection)
    })
}
function addUsers(conn){
    const sql ="INSERT INTO Users(name, avatar, city) VALUES ?";
    const values = [
        ['emanuele', 'avatarimg', 'limoeiro'],
        ['leticia', 'avatarLeticia', 'limoeiro']
    ];
    conn.query(sql, [values], (error, results, liels) => {
        if (error) return console.log(error)
        console.log("adicionou registros!")
        conn.end()
    })
}