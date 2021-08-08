import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { httpConnectionService } from './service/httpConnection.service';
import { AddBookDialogComponent } from './book-dialog/add-book-dialog/add-book-dialog.component';
import { book } from './Models/bookSaved';
import { Subscription } from 'rxjs';
import { SliderComponent } from './slider/slider/slider.component';
import { InterCommunicationService, navTypes } from './service/inter-communication.service';
import { sliderPageTypes } from'./enums/sliderPages';
import { PageSwitchService } from './service/page-switch.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('slider', {static: true}) slider!: SliderComponent;

  sliderPageTypes = sliderPageTypes;

  title = 'book-manager';
  savedBook!: book[];

  success = false;
  failure = false; 
  isVisible = false;

  navs: navTypes[]  = this.inerCommSer.navTypes;

  openDialogSubscription: Subscription =  Subscription.EMPTY;
  updateDialogSubscription: Subscription = Subscription.EMPTY;

  editBookSubscription: Subscription = Subscription.EMPTY;
  deleteBookSubscription:  Subscription = Subscription.EMPTY;
  addBookSubscription: Subscription  = Subscription.EMPTY;

  constructor(
    public dialog: MatDialog,
    readonly connSer: httpConnectionService,
    private readonly inerCommSer: InterCommunicationService,
    private readonly pageSer: PageSwitchService
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
    this.pageSer.navChangeSubject.subscribe((val) => console.log(val))
  }

  showSlider(show: boolean){
    this.slider.toggleOpenShow().subscribe(res => {console.log(res)})
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddBookDialogComponent, {
      width: '500px',
    });

    this.openDialogSubscription = dialogRef.afterClosed().subscribe((value) => {
      if (value != undefined) {
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
