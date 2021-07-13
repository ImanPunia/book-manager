import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { httpConnectionService } from './service/httpConnection.service';
import { AddBookDialogComponent } from './book-dialog/add-book-dialog/add-book-dialog.component';
import { book } from './Models/bookSaved';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'book-manager';
  savedBook!: book[];

  constructor(
    public dialog: MatDialog,
    readonly connSer: httpConnectionService
  ) {}

  ngOnInit(): void {
    this.displayBooks();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddBookDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((value) => {
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
}
