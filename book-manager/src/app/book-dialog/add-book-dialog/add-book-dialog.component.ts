import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from 'src/app/Models/Book';
import { book, updateBook } from 'src/app/Models/bookSaved';

@Component({
  selector: 'app-add-book-dialog',
  templateUrl: './add-book-dialog.component.html',
  styleUrls: ['./add-book-dialog.component.scss'],
})
export class AddBookDialogComponent implements OnInit {

  @ViewChild('bookForm', { static: true })
  bookForm!: NgForm;

  isUpdate: boolean = false;
  book: Book = new Book('', '', '', '', null);
  editBook!:  book;

  fileName: string = '';

  constructor(public dialogRef: MatDialogRef<AddBookDialogComponent> , 
    @Inject(MAT_DIALOG_DATA) data: book) {
      
      if(data) {
        this.editBook = data;
        this.isUpdate = true;
        this.book = new Book(data.name, data.author,  data.copies,  data.volume, null);
        const index = data.file.url.indexOf('-');
        this.fileName = data.file.url.substring(index + 1);
      }
    }

  ngOnInit(): void {}

  setFileName($event: any) {
    this.fileName = $event.target.files[0].name;
  }

  addBook() {
    this.dialogRef.close(this.book);
  }

  updateBook(){
    this.dialogRef.close(this.prepareUpdateObj());
  }

  prepareUpdateObj(){
    const updatedBook = new updateBook(this.editBook._id, this.book.name, this.book.author, this.book.copies,
                                      this.book.volume, this.book.file, this.editBook.file );
    return updatedBook;
  }


}
