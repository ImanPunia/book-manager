const {MongoClient} = require('mongodb');

const uri = "mongodb://localhost:27017/awesome-blogs";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
  

async function connect() {
    try {
       client.connect((err,db) => {
            if(!err) {
                console.log("connected" + db);
            } else {
                console.log( "Error: " + err);
            }
          });
          client.db().createCollection
      return client;
    } catch (e) {
        console.error(e);
    }
  }

  //creates Collection
  async function createDbCollection(){
        client.db().createCollection('data1', (err, collection) => {
            if(err){
                console.log("Error" + err);
            } else {
                console.log("collection created" + collection);
                createDocument();
            }
        });
  }

  //creates document in collection
  async function createDocument(){
   
    var collection = client.db().collection('data1');
    var doc1 = {'name':'Harman' , 'published': 'false'};
  
    collection.insertOne(doc1, (err,value) => {
        if(!err) {
            console.log("inserted" + value);
        } else {
            console.log("not inserted" + err);
        }
    });

  }

  //lists the Databases
  async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
  };
  
  async function closeConnection(){
    await client.close();
  }

  module.exports = connect;
