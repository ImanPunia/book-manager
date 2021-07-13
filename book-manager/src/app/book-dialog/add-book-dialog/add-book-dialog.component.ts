import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from 'src/app/Models/Book';
import { book } from 'src/app/Models/bookSaved';

@Component({
  selector: 'app-add-book-dialog',
  templateUrl: './add-book-dialog.component.html',
  styleUrls: ['./add-book-dialog.component.scss'],
})
export class AddBookDialogComponent implements OnInit {
  book: Book = new Book('', '', '', '', null);

  fileName: string = '';

  constructor(public dialogRef: MatDialogRef<AddBookDialogComponent> , 
    @Inject(MAT_DIALOG_DATA) data: book) {
      this.book = new Book(data.name, data.author,  data.volume,  data.copies, null);
      const index = data.file.url.indexOf('-');
      this.fileName = data.file.url.substring(index + 1);
    }

  ngOnInit(): void {}

  setFileName($event: any) {
    this.fileName = $event.target.files[0].name;
  }

  addBook() {
    this.dialogRef.close(this.book);
  }
}
