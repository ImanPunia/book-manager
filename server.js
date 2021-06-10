const express = require('express');
const con = require('./database/connection');
const router = require('./bookRouter/bookRouter');

//creates connection to database
con.name.connect();

//creates collection and insert document in same
con.name.createDbCollection();

const app = express(),
      bodyParser = require("body-parser");
      port = 3080;

      app.use('/book',router);

      app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
      })