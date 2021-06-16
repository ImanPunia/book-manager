const {MongoClient} = require('mongodb');

const uri = "mongodb://localhost:27017/book-manager";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connect(callBack){
   await client.connect(callBack)
}

async function closeConnection(){
  await client.close();
}

module.exports = connect;
