const express = require('express');

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