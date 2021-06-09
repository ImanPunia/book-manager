const express = require('express');
const con = require('./database/connection');

//creates connection to database
con.name.connect();

//creates collection and insert document in same
con.name.createDbCollection();

const app = express(),
      bodyParser = require("body-parser");
      port = 3080;

      app.get('/api/hello-world', (req, res) => {
        res.send({"value":'Hello World!!!!!'})
      })
      
      app.get('/', (req, res) => {
        res.send('Hello World!')
      })
      
      app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
      })