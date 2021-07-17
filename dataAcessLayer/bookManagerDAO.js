const { ObjectId } = require("mongodb");
const Book = require('../model/book');

class bookDao{

    constructor(client){
        this.client = client;
    }
    
    async insertOneBook(book,handleSuccess,res){
        try{
            this.client.then((val) => val.insertOne(book, (err,value) => {
                if(err) {
                    return res.status(500).send({'text':'Unable to insert document'})
                } else {
                    handleSuccess(res,value.insertedCount,value.ops,value.insertedId);
                }
            }),
            _err => {
                res.status(500).send({'text':'unable to get connection'})
            });
        } catch(e){
            res.send(500).send({'text':'Unable to save document'});
        }
      
    }

    async fetchBooks(handleSuccess,res) {
        try{
            this.client.then(val =>  {
                        val.find().toArray().then(val => {
                            handleSuccess(res,val.length,val);
                        }, err => {
                            return res.status(404).send({'text':'Unable to fetch data'})
                        }) 
            })
        } catch(e) {
            return res.status(500).send({'text':"unable to fetch"});
        }
            
    }

    async deleteBook(id,res){
        try{
            this.client.then(val => {
                    val.deleteOne({_id:ObjectId(id)},(err,value) => {
                        const count = value.deletedCount;
                     if(err) {
                         return res.status(404).send({'text':'Unable to delete document'});
                     } else {
                         return res.status(200).send({'text':'deletion successful','count':count});
                     }
                    });
             },
             _err => {
                 res.status(500).send({'text':'unable to get connection'})
             });
        } catch(e){
            return res.status(500).send({'text':'Unable to delete entry'})
        }
        
    }

    async updateSinglebook(bookData,handleSuccess,res){
        const book = new Book(bookData.name, bookData.author,bookData.copies,bookData.volume,bookData.file);
        
        const filter   =  { '_id' : ObjectId(bookData._id)};
        const options = { "upsert": false };
        let updateDoc = {
            $set: book,
        };
      
        try{
            this.client.then(val => val.updateOne(filter, updateDoc,options, function(err, value) {
                if(err) {
                    return res.status(500).send({'text':'Unable to update document'});
               } else {
                   const updatedBook = [];
                   updatedBook.push(bookData);
                   handleSuccess(res,value.modifiedCount,updatedBook);
               }
               }),
               _err => {
                   res.status(500).send({'text':'unable to get connection'})
               });
        } catch(e)  {
            return res.status(500).send({'text':'Unable to update document'});
        }
            

      }

}

module.exports = bookDao;