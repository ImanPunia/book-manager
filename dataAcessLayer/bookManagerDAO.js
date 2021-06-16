class bookDao{

    constructor(client){
        this.client = client;
    }

    async insertOneBook(book,callBack,res){
            this.client.insertOne(book, (err,value) => {
                if(!err) {
                    const successMsg = 'Insertion successfull';
                    callBack(undefined,successMsg,res);
                } else {
                    const errroMsg = 'Insertion Failed' + err;
                    callBack(errroMsg,undefined,res);
                }
            });
    }
}

module.exports = bookDao;