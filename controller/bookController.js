const app = require('../app');
const BookDao = require('../dataAcessLayer/bookManagerDAO');
const Book = require('../model/book');
const BookResponse = require('../model/bookResponse');
const fs = require('fs'), path = require('path');


function handleSuccessError(err,res,count,books,id){
    if(err) {
        return res.send({'test':err,  'count' : count})
    } else {
        return fetchFiles(books,res,count,id);
     }
}

function fetchFiles(books,res,count,id){
    console.log(id);
    const bookData = [];
    books.forEach(book => {
        let objId;
        const _fileName = book.file.url;
        const file =  fs.readFileSync(_fileName).toString('base64');
        if(id){
         objId = id.toString();
        } else {
            objId = book._id.toString();
        }
        bookData.push(new BookResponse(objId,book.name,book.author,book.copies,book.volume,book.file,file));
   })
  return res.send({'books': bookData, 'count': count});
}

/**
 * insert single book in database
 * @param {*} req request object
 * @param {*} res response object
 */
function addBooks(req,res){
    const bookData = JSON.parse(req.body.data);
    const imageData = req.file;
    const imageUrl = imageData.path;
    const imagetype = imageData.mimetype;
    const file = {url:imageUrl,mimetype: imagetype};
    const book = new Book(bookData.name, bookData.author,bookData.volume,bookData.copies,file);
    const bookDao = new BookDao(req.app.get('db'));
    bookDao.insertOneBook(book,handleSuccessError,res);
}

function fetchBook(req,res){
    const bookDao = new BookDao(req.app.get('db'));
    bookDao.fetchBooks(handleSuccessError,res);
}

function deleteBook(req,res){
    const bookId = req.params.id;
    const bookDao = new BookDao(req.app.get('db'));
    bookDao.deleteBook(bookId,res);
}

function updateBook(req,res) {
    const bookData = JSON.parse(req.body.data);
    const imageData = req.file;
    let file ;
    if(imageData){
        const imageUrl = imageData.path;
        const imagetype = imageData.mimetype;
         file = {url:imageUrl,mimetype: imagetype};
         bookData.file = file;
    } else{
        file = bookData.file;
    }
    
    const bookDao = new BookDao(req.app.get('db'));
    bookDao.updateSinglebook(bookData,handleSuccessError,res);

}
module.exports = {addBooks , fetchBook, deleteBook ,updateBook};
