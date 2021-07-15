import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { httpConnectionService } from './service/httpConnection.service';
import { AddBookDialogComponent } from './book-dialog/add-book-dialog/add-book-dialog.component';
import { book } from './Models/bookSaved';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'book-manager';
  savedBook!: book[];

  openDialogSubscription!: Subscription;
  updateDialogSubscription!: Subscription;
  updateDialogSubscription!: Subscription;

  constructor(
    public dialog: MatDialog,
    readonly connSer: httpConnectionService
  ) {}

  ngOnDestroy(): void {
    if(this.openDialogSubscription) {
      this.openDialogSubscription.unsubscribe();
    }

    if(this.updateDialogSubscription) {
      this.updateDialogSubscription.unsubscribe();
    }

    if(this.updateDialogSubscription){
      this.updateDialogSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.displayBooks();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddBookDialogComponent, {
      width: '500px',
    });

    this.openDialogSubscription = dialogRef.afterClosed().subscribe((value) => {
      if (value != undefined) {
        console.log(JSON.stringify(value));
        let formData = new FormData();
        formData.append('file', value.file);
        formData.append('data', JSON.stringify(value));
        this.addSingleBook(formData);
      }
    });
  }

  addSingleBook(formData: FormData) {
    this.connSer.addSingleBook(formData).subscribe((res) => this.savedBook.push(res[0]));
  }

  displayBooks(){
    this.connSer.fetchBooks().subscribe((res) => this.savedBook  = res)
  }

  deleteBook(id: String){
    this.connSer.deleteBook(id).subscribe(res => {
      const removedBook  = this.savedBook.filter(array => array._id === id);
      this.savedBook.splice(this.savedBook.indexOf(removedBook[0]),1);
    });
  }

  updateRecord(book: book){

    const config = new MatDialogConfig();
    config.width  = '500px';
    config.data = book;
    const dialogRef = this.dialog.open(AddBookDialogComponent, config);

    this.updateDialogSubscription = this.updateDialogSubscription = dialogRef.afterClosed().subscribe((value) => {
      if (value != undefined) {
        console.log(JSON.stringify(value));
        let formData = new FormData();
        formData.append('file', value.uploadedFile);
        formData.append('data', JSON.stringify(value));
        this.updateSingleBook(formData);
      }
    });
  }

  updateSingleBook(formData: FormData) {
    this.connSer.updateBook(formData).subscribe((res) => { 
      const updatedBook  = this.savedBook.filter(array => array._id === res[0]._id);
      const index = this.savedBook.indexOf(updatedBook[0]);
      this.savedBook.splice(index,1,res[0]);
    });
  }
}
