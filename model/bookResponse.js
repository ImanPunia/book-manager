class bookResponse{

    constructor(id,name,author,copies,volume,file,src){
        this._id = id
        this.name = name;
        this.author = author;
        this.copies = copies;
        this.volume = volume;
        this.file = file;
        this.src = src;
    }

}

module.exports = bookResponse;
