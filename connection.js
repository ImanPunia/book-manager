const {MongoClient} = require('mongodb');

async function main() {

    const uri = "mongodb://localhost:27017/awesome-blogs";
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

    try {
       client.connect((err,db) => {
          if(!err) {
              console.log("connected" + db);
          } else {
              console.log( "Error: " + err);
          }
        });

      await createDbCollection(client);
   
    } catch (e) {
        console.error(e);
    } finally {
     // await client.close();
    }

  }

  main().catch(console.error);

  //creates Collection
  async function createDbCollection(client){
        client.db().createCollection('test', (err, collection) => {
            if(err){
                console.log("Error" + err);
            } else {
                console.log("collection created" + collection);
                createDocument(client.db());
            }
        });
  }

  //creates document in collection
  async function createDocument(client){
   
    var collection = client.collection('test');
    var doc1 = {'name':'doc1' , 'published': 'true'};
  
    collection.insert(doc1, (err,value) => {
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
