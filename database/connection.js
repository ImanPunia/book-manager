const {MongoClient} = require('mongodb');

const uri = "mongodb://localhost:27017/book-manager";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db =   client.connect().then(dbClient => dbClient.db());

async function closeConnection(){
  await client.close();
}

module.exports = db;
