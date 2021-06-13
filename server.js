
const con = require('./database/connection');
const app = require('./app');

//creates connection to database
con.name.connect();

//creates collection and insert document in same
//con.name.createDbCollection();

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});


