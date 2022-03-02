const express = require('express');
const homeRouter = require('./routes/home')
const app = express()

app.use(express.json())

app.use('/', homeRouter)

app.listen(3000)