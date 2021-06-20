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
}

module.exports = bookDao;