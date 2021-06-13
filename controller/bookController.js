
module.exports =  getBooks = (req,res) => {
    return res.send(printMessage());
}

function printMessage(){
    return 'books are fetched successfully IMAN';
}

