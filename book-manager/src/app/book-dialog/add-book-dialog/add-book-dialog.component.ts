import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import { Book } from 'src/app/Models/Book';

@Component({
  selector: 'app-add-book-dialog',
  templateUrl: './add-book-dialog.component.html',
  styleUrls: ['./add-book-dialog.component.scss']
})
export class AddBookDialogComponent implements OnInit {

  public book: Book = new Book('','','','', null);

   fileName = '';

  constructor(public dialogRef: MatDialogRef<AddBookDialogComponent>) { }

  ngOnInit(): void {

  }

  setFileName($event: any){
    this.fileName = $event.target.files[0].name;

  }

  addBook(){
    this.dialogRef.close(this.book);
  }

}
