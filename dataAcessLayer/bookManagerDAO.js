const { all } = require("../app");

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
                    handleSuccessError(undefined,successMsg,res,value.ops);
                }
            }));
    }

    async fetchBooks(handleSuccessError,res) {
        this.client.then(val =>  val.find().toArray().then(val => {
            handleSuccessError(undefined,undefined,res,val);
        }))
    }
}

module.exports = bookDao;