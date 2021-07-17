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
  success = false;
  failure = false; 

  openDialogSubscription: Subscription =  Subscription.EMPTY;
  updateDialogSubscription: Subscription = Subscription.EMPTY;

  editBookSubscription: Subscription = Subscription.EMPTY;
  deleteBookSubscription:  Subscription = Subscription.EMPTY;
  addBookSubscription: Subscription  = Subscription.EMPTY;

  constructor(
    public dialog: MatDialog,
    readonly connSer: httpConnectionService
  ) {}

  ngOnDestroy(): void {
    this.unsubscribeSubscription(this.editBookSubscription);
    this.unsubscribeSubscription(this.deleteBookSubscription);
    this.unsubscribeSubscription(this.addBookSubscription);
    this.unsubscribeSubscription(this.openDialogSubscription);
    this.unsubscribeSubscription(this.updateDialogSubscription);
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
    this.connSer.addSingleBook(formData).subscribe(res => {
    this.savedBook.push(res.books[0])
    this.displayNotification(res.count); 
    }, 
    err => {
      this.failure= true
      this.success = false;
    });
  }

  displayBooks(){
    this.connSer.fetchBooks().subscribe(res => 
    {
      this.savedBook  = res.books;
    },
    err => {
      this.failure = true;
      this.success = false;
    })
  }

  deleteBook(id: String){
    this.connSer.deleteBook(id).subscribe(res => {
      const removedBook  = this.savedBook.filter(array => array._id === id);
      this.savedBook.splice(this.savedBook.indexOf(removedBook[0]),1);
      this.displayNotification(res.count); 
    },
    err => {
      this.failure = true;
      this.success = false;
    });
  }

  updateRecord(book: book){
    const config = new MatDialogConfig();
    config.width  = '500px';
    config.data = book;
    const dialogRef = this.dialog.open(AddBookDialogComponent, config);

    this.updateDialogSubscription = this.updateDialogSubscription = dialogRef.afterClosed().subscribe((value) => {
      if (value != undefined) {
        let formData = new FormData();
        formData.append('file', value.uploadedFile);
        formData.append('data', JSON.stringify(value));
        this.updateSingleBook(formData);
      }
    });
  }

  updateSingleBook(formData: FormData) {
    this.connSer.updateBook(formData).subscribe(res => { 
      const updatedBook  = this.savedBook.filter(array => array._id === res.books[0]._id);
      const index = this.savedBook.indexOf(updatedBook[0]);
      this.savedBook.splice(index,1,res.books[0]);
      this.displayNotification(res.count); 
    },
    err => {
      this.failure = true;
      this.success = false;
    });
  }

  unsubscribeSubscription(subscription:Subscription){
    if(subscription){
      subscription.unsubscribe();
    }
  }

  displayNotification(count:string){
    if(count){
      this.failure = false;
      this.success = true;
    } 
  }
}
