class updateBook{

    constructor(id,name,author,volume,copies,file){
        this._id = id
        this.name = name;
        this.author = author;
        this.copies = copies;
        this.volume = volume;
        this.file = file;
    }

}

module.exports = updateBook;
