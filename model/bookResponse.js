class bookResponse{

    constructor(name,author,volume,copies,file,src){
        this.name = name;
        this.author = author;
        this.copies = copies;
        this.volume = volume;
        this.file = file;
        this.src = src;
    }

}

module.exports = bookResponse;
