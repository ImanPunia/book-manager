
const connect =  require('./database/connection');
const app = require('./app');

function callBack(err,db){
  if(err){
    console.log('connection unsuuccessfull')
  } else{
    console.log('succesfull');
  }
  app.set('db',db.db().collection('Books'));
}

connect(callBack);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});


