import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from 'src/app/Models/Book';
import { book } from 'src/app/Models/bookSaved';

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

  fileName: string = '';

  constructor(public dialogRef: MatDialogRef<AddBookDialogComponent> , 
    @Inject(MAT_DIALOG_DATA) data: book) {
      
      if(data) {
        this.isUpdate = true;
        this.book = new Book(data.name, data.author,  data.volume,  data.copies, null);
        const index = data.file.url.indexOf('-');
        this.fileName = data.file.url.substring(index + 1);
      }
    }

  ngOnInit(): void {}

  setFileName($event: any) {
    this.fileName = $event.target.files[0].name;
  }

  addBook() {
    console.log(this.book);
    this.dialogRef.close(this.book);
  }

  updateBook(){
    const bookData = this.getChangedValues();
    this.dialogRef.close(bookData);
  }

  getChangedValues(){
    const book: any = {} ;
    Object.keys(this.bookForm.controls).forEach(name => {
        if(this.bookForm.controls[name].dirty){
          book[name] = this.bookForm.controls[name].value;
        }
    });
    return book;
  }

}
