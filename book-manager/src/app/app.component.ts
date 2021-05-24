import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AddBookDialogComponent } from './book-dialog/add-book-dialog/add-book-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'book-manager';

  constructor(public dialog: MatDialog){ }

  openDialog(): void{
    const   dialogRef  = this.dialog.open(AddBookDialogComponent,{width:'500px'});

    dialogRef.afterClosed().subscribe((value) => {
        console.log(JSON.stringify(value));
    })
  }

}
