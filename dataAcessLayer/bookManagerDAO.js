const { ObjectId } = require("mongodb");
const Book = require('../model/book');

class bookDao{

    constructor(client){
        this.client = client;
    }
    
    async insertOneBook(book,handleSuccessError,res){
        this.client.then(val => val.insertOne(book, (err,value) => {
                if(err) {
                    const errroMsg = 'Unable to insert document';
                    handleSuccessError(errroMsg,undefined,res);
                } else {
                    const successMsg = 'Insertion successfull';
                    handleSuccessError(undefined,successMsg,res,value.ops,value.insertedId);
                }
            }));
    }

    async fetchBooks(handleSuccessError,res) {
        this.client.then(val =>  val.find().toArray().then(val => {
            handleSuccessError(undefined,undefined,res,val);
        }))
    }

    async deleteBook(id,res){
        this.client.then(val => {
           val.deleteOne({_id:ObjectId(id)},(err,value) => {
               const count = value.deletedCount;
            if(err) {
                return res.status(404).send({'text':'Unable to delete document','count': count});
            } else {
                return res.status(200).send({'text':'deletion successful','count':count});
            }
           });
        });
    }

    async updateSinglebook(bookData,handleSuccessError,res){
        const book = new Book(bookData.name, bookData.author,bookData.copies,bookData.volume,bookData.file);
        
        const filter   =  { '_id' : ObjectId(bookData._id)};
        const options = { "upsert": false };
        let updateDoc = {
            $set: book,
        };
      
            this.client.then(val => val.updateOne(filter, updateDoc,options, function(err, value) {
             if(err) {
                const errroMsg = 'Unable to insert document';
                handleSuccessError(errroMsg,undefined,res);
            } else {
                const successMsg = 'Updation successfull';
                const updatedBook = [];
                updatedBook.push(bookData);
                handleSuccessError(undefined,successMsg,res,updatedBook);
            }
            }));

      }

}

module.exports = bookDao;