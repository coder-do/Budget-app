const express = require('express');
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    console.log(req.params.name);
    res.send('Hello')
})

app.listen(3000)