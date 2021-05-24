import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import { addBook } from 'src/app/Models/addBook';

@Component({
  selector: 'app-add-book-dialog',
  templateUrl: './add-book-dialog.component.html',
  styleUrls: ['./add-book-dialog.component.scss']
})
export class AddBookDialogComponent implements OnInit {

  public book: addBook = new addBook('','','','');


  constructor(public dialogRef: MatDialogRef<AddBookDialogComponent>) { }

  ngOnInit(): void {

  }

  addBook(){
    this.dialogRef.close(this.book);
  }
}
