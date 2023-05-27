const express = require('express');
const router = require('./Router/router');
const app = express();
app.use(express.json()); 
const port = 3000;


app.use("/api", router)



app.listen(port)