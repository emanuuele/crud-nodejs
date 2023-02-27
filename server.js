const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.json({ limit: 819200 }));
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.json())

const userRoutes = require('./routes/users')
app.use(userRoutes)
const addressRoutes = require('./routes/addresses')
app.use(addressRoutes)
const filterRoutes = require('./routes/filter')
app.use(filterRoutes)

const port = 3000; //porta padrão
app.listen(port, () => { console.log('eu estou executando')})