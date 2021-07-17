const app = require('../app');
const BookDao = require('../dataAcessLayer/bookManagerDAO');
const Book = require('../model/book');
const BookResponse = require('../model/bookResponse');
const fs = require('fs'), path = require('path');


function handleSuccess(res,count,books,id){
        return fetchFiles(books,res,count,id);
}

function fetchFiles(books,res,count,id){
    const bookData = [];
    books.forEach(book => {
        let objId;
        const _fileName = book.file.url;
        const fileData =  fs.readFileSync(_fileName).toString('base64');

        if(id){
            objId = id.toString();
        } else {
            objId = book._id.toString();
        }
        const {name,author,copies,volume,file} = book;
        bookData.push(new BookResponse(objId,name,author,copies,volume,file,fileData));
   })
  return res.status(200).send({'books': bookData, 'count': count});
}

/**
 * insert single book in database
 * @param {*} req request object
 * @param {*} res response object
 */
function addBooks(req,res){
    const bookData = JSON.parse(req.body.data);
    const imageData = req.file;
    const file = {url:imageData.path,mimetype: imageData.mimetype};
    const book = new Book(bookData.name, bookData.author,bookData.volume,bookData.copies,file);
    const bookDao = new BookDao(req.app.get('db'));
    bookDao.insertOneBook(book,handleSuccess,res);
}

/**
 * fetch all saved books
 * @param {*} req 
 * @param {*} res 
 */
function fetchBook(req,res){
    const bookDao = new BookDao(req.app.get('db'));
    bookDao.fetchBooks(handleSuccess,res);
}

/**
 *  delete the book
 * @param {*} req 
 * @param {*} res 
 */
function deleteBook(req,res){
    const bookId = req.params.id;
    const bookDao = new BookDao(req.app.get('db'));
    bookDao.deleteBook(bookId,res);
}

/**
 *  update the book data
 * @param {*} req 
 * @param {*} res 
 */
function updateBook(req,res) {
    const bookData = JSON.parse(req.body.data);
    const imageData = req.file;
    let file ;
    
    if(imageData){
        file = {url:imageData.path,mimetype: imageData.mimetype};
        bookData.file = file;
    } else{
        file = bookData.file;
    }
    
    const bookDao = new BookDao(req.app.get('db'));
    bookDao.updateSinglebook(bookData,handleSuccess,res);
}

module.exports = {addBooks , fetchBook, deleteBook ,updateBook};
