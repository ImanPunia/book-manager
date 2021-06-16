
const connect =  require('./database/connection');
const app = require('./app');

//creates connection to database
async function dbConnect(){
  const db = await connect;
  return db.collection('Books') ;
}

app.set('db', dbConnect());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});


