const express = require('express');
const app = express();

app.get('/', (req, res) => {
    return res.json({message:"Hello world from express"})
    
})

app.listen(3000, () => {
    console.log("App Is running on the server")
})